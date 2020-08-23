import React, { useState, useEffect, useCallback } from 'react';
import { Styles } from '../styles';
import FormHOC from '../HOC/FormHOC';
import { formatNumber } from '../utils/productItemFormatter';
import { isValid, isFormatted, revertNumberFormat } from '../utils/numberFormatter';
import FormNavigator from '../components/navigators/FormNavigator';
import { Tags } from '../tags';
import { withRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import PageLoader from '../components/loaders/PageLoader';
import AppLoader from '../components/loaders/AppLoader';
import Payments from '../containers/settings/Payments';
import Modal from '../containers/AppModal';
import StoreLocation from '../components/StoreLocation';
import { objLen } from '../utils/formatters';
import { faCloudUploadAlt, faTimesCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone'
import { loadImage } from '../utils/imageFormatter';
import axios from 'axios';

const { Merchant, Media } = Tags;
const { Common, Animations, DropImage } = Styles;
const { Messages } = Common;
const { Item, Toggle } = Styles.Settings;

const inputs = [ 'deliveryFee', 'payment' ]
const blacklist = [ 'deliveryFee', 'payment' ];

const Settings = ({
  onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading, setTargetMessage, setCustomValue,
  match: { params }
}) => {
  const [ saveSettings ] = useMutation(Merchant.Mutations.saveSettings);
  const [ saveLocations ] = useMutation(Merchant.Mutations.saveLocations);
  const [ checkDir ] = useMutation(Media.Mutations.checkDir);
  const [ upload ] = useMutation(Media.Mutations.upload);

  const { loading: settingsLoading, data: settingsData } = useQuery(Tags.Merchant.Queries.getSettings, {
    variables: { storeName: params.name }
  });
  const { loading: locationsLoading, data: locationsData } = useQuery(Tags.Merchant.Queries.getLocations, {
    variables: { storeName: params.name }
  });

  const [ delivery, setDelivery ] = useState(false);
  const [ tempPrice, setTempPrice ] = useState("0.00");
  const [ selectedPayments, setSelectedPayments ] = useState({});
  const [ mapModal, setMapModal ] = useState(false);
  const [ markers, setMarkers ] = useState({});
  const [ locationLoading, setLocationLoading ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ preview, setPreview ] = useState(null);

  useEffect(() => {
    if (!settingsLoading && !locationsLoading) {
      setMarkers(locationsData.getLocations);
      let methods = {};
      if (settingsData) {
        setDelivery(settingsData.getSettings.delivery);
        if (settingsData.getSettings.methods && settingsData.getSettings.methods.length >= 1) {
          settingsData.getSettings.methods.map(meth => {
            methods[meth.type] = { status: meth.status, account: meth.account }
          })
        }
        setSelectedPayments(methods)
        setImage('logo')
        setTempPrice(formatNumber(settingsData.getSettings.deliveryFee));
        setTimeout(() => {
          setCustomValue('deliveryFee', '', settingsData.getSettings.deliveryFee);
        }, 0);
      }
    }
  }, [ settingsData, locationsData ])

  const onDrop = useCallback((files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  }, [ image ]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg, image/webp'
  })

  const hasFormErrors = () => {
    let errors = false;
    if (
      delivery && formData['deliveryFee'] == undefined ||
      delivery && (formData['deliveryFee'] !== undefined && formData['deliveryFee'].value == 0)
    ) {
      setTargetMessage('deliveryFee', 'Please enter a delivery fee');
      errors = true;
    }
    return errors;
  }

  const paymentError = () => {
    let errors = false;
    Object.keys(selectedPayments).forEach(payment => {
      if ((selectedPayments[payment].account == null) || (selectedPayments[payment].account == undefined)) {
        setTargetMessage('payment', 'Please enter your account number');
        errors = true;
      }
    })
    return errors;
  }

  const onSubmit = async () => {
    setLoading(true);
    let submitError = onFormSubmit();
    let methods = [];

    // Display error messages //
    setTimeout(() => (hasFormErrors()), 0);

    if (hasFormErrors() || submitError || paymentError()) {
      setLoading(false);
    } else {
      Object.keys(selectedPayments).forEach(pay => {
        if (selectedPayments[pay].status == true) {
          methods.push({ type: pay, status: selectedPayments[pay].status, account: selectedPayments[pay].account })
        }
      })

      if (process.env.NODE_ENV === 'development') {
        const res = await checkDir({
          variables: {
            storeName: params.name,
            isLogo: true,
            isCover: false,
            session: ''
          }
        });
      }

      if (delivery) {
        if (formData['deliveryFee'] !== undefined && formData['deliveryFee'].value) {
          let res = await saveSettings({ variables: {
            storeName: params.name, delivery, deliveryFee: formData['deliveryFee'].value, methods: JSON.stringify(methods)
          }});
          if (res.data.saveSettings) {
            setLoading(false)
          }
        }
      } else {
        let res = await saveSettings({ variables: {
          storeName: params.name, delivery, deliveryFee: 0, methods: JSON.stringify(methods), logo: image
        }});
        if (res.data.saveSettings) {
          setLoading(false);
        }
      }
    }
  }
  
  const isInvalidInput = (number, temp, state, previousState, target) => {
    if ((previousState !== null) && (formatNumber(previousState !== undefined ? previousState.value : 0) !== number)) {
      if (!isValid(number)) {
        temp(formatNumber(0))
        state(target, '', 0);
      } else if (number == '') {
        temp(formatNumber(0))
        state(target, '', 0);
      } else {
        temp(formatNumber(Math.abs(parseFloat(parseFloat(number).toString(), 10))));
        state(target, '', isFormatted(number) ? revertNumberFormat(number) : Math.abs(parseInt(number.toString(), 10)));
      }
    }
  }

  if (settingsLoading) {
    return <PageLoader />
  } else {
    return (
      <div>
        {
          loading && (
            <AppLoader />
          )
        }
        {
          mapModal && (
            <Modal
              width="90%"
              header="Store Locations"
              placeholder="Confirm"
              isOpen={mapModal}
              loading={locationLoading}
              conditions={() => false}
              buttonAction={async () => {
                setLocationLoading(true)
                let locations = [];
                Object.keys(markers).forEach(marker => {
                  locations.push(markers[marker]);
                });
                let res = await saveLocations({ variables: { storeName: params.name, locations: JSON.stringify(locations) } });
                if (res.data.saveLocations) {
                  setLocationLoading(false);
                  setMapModal(false);
                } else {
                  setLocationLoading(false);
                  setMapModal(false);
                }
              }}
              modalAction={setMapModal}
              cancelAction={() => {
                setMapModal(false);
                setMarkers({});
              }}
              disableClick={true}
            >
              <StoreLocation markers={markers} setMarkers={setMarkers} />
            </Modal>
          )
        }

        <Common.Headers.Identifier>Payments</Common.Headers.Identifier>
        <Common.Description>Select how you want to receive your future payments</Common.Description>
        <Payments selectedPayments={selectedPayments} setSelectedPayments={setSelectedPayments} />
        {
          (formData['payment'] && formData['payment'].error) && (
            <Animations.FadeIn>
              <Messages.Error>{formData['payment'].error}</Messages.Error>
            </Animations.FadeIn>
          )
        }
        <br />

        <Common.Headers.Identifier>Delivery</Common.Headers.Identifier>
        <Item.Layout>
          <Item.Header>Does your store offer delivery?</Item.Header>
          <Toggle.Switch>
            <Toggle.Check type="checkbox" onChange={() => (setDelivery(!delivery), clearInputField('deliveryFee', null))} />
            <Toggle.Slider checked={delivery} />
          </Toggle.Switch>
        </Item.Layout>

        <br />
        <br />

        <Common.Headers.Identifier>Pickup Locations</Common.Headers.Identifier>
        <Item.Layout>
          <Item.Header>Store locations</Item.Header>
          <Common.Buttons.Default onClick={() => setMapModal(true)}>
            Update
          </Common.Buttons.Default>
        </Item.Layout>

        {
          delivery && (
            <Animations.FadeIn>
              <Common.Form.Wrapper>
                <Common.Form.Identifier>Delivery Fee</Common.Form.Identifier>
                <Common.Form.Input
                  name='deliveryFee'
                  onChange={e => (onInputChange(e), clearInputField('deliveryFee', e), setTempPrice(e.target.value))}
                  onBlur={() => (isInvalidInput(tempPrice, setTempPrice, setCustomValue, formData['deliveryFee'], 'deliveryFee'))}
                  value={tempPrice}
                />
                {
                  (formData['deliveryFee'] && formData['deliveryFee'].error) && (
                    <Animations.FadeIn>
                      <Messages.Error>{formData['deliveryFee'].error}</Messages.Error>
                    </Animations.FadeIn>
                  )
                }
              </Common.Form.Wrapper>
            </Animations.FadeIn>
          )
        }

        <br />

        <Common.Headers.Identifier>Logo</Common.Headers.Identifier>
        <DropImage.Container {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragReject ? (
              <DropImage.Layout>
                <DropImage.Icon style={{color: '#a34f4f'}} icon={faTimesCircle} />
                <DropImage.HoverLabel style={{color: '#a34f4f'}}>only .jpg .jpeg .png .webp accepted</DropImage.HoverLabel> 
              </DropImage.Layout>
            ) : isDragActive ? (
              <DropImage.Layout>
                <DropImage.Icon style={{color: '#58aa63'}} icon={faCheck} />
                <DropImage.HoverLabel style={{color: '#58aa63'}}>Drop a logo here</DropImage.HoverLabel> 
              </DropImage.Layout>
            ) : (
              <DropImage.Layout>
                <DropImage.Icon icon={faCloudUploadAlt} />
                <DropImage.Label>Drop a logo here</DropImage.Label>
              </DropImage.Layout>
            )
          }
        </DropImage.Container>

        {
          image && (
            <div style={{ display: 'flex', flexDirection: 'column', margin: 10, maxWidth: '60px' }}>
              <DropImage.Preview src={preview || loadImage(params.name, 'logo', true, false, null)} />
              <span
                style={{
                  color: '#e52b16',
                  textDecoration: 'underline',
                  fontSize: '13px',
                  padding: '5px 0px',
                  cursor: 'pointer'
                }}
                onClick={() => setImage(null)}
              >
                Remove
              </span>
            </div>
          )
        }

        <FormNavigator conditions={() => false} onSubmit={onSubmit} loading={loading} hasErrors={hasErrors} placeholder="Save" />
      </div>
    )
  }
}

const component = FormHOC({ inputs, blacklist })(Settings);
export default withRouter(component);
