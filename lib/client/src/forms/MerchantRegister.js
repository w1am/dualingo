import React, { useState, useCallback } from 'react';
import { Styles } from '../styles';
import FormNavigator from '../components/navigators/FormNavigator';
import { faCloudUploadAlt, faTimesCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormHOC from '../HOC/FormHOC';
import Modal from '../containers/AppModal';
import { objLen } from '../utils/formatters';
import { isAuthenticated } from '../utils/verifyUser';
import { useMutation } from '@apollo/react-hooks';
import { Tags } from '../tags';
import { useDropzone } from 'react-dropzone'
import ImagePreview from '../components/ImagePreview';
import Message from '../components/messages/Notification';

const { User, Merchant } = Tags;

const { Common, Forms, Animations, DropImage } = Styles;
const { Messages } = Common;
const { Register } = Forms.Merchant;
const { Layout, Container } = Register;

const inputs = [ 'name', 'storeName' ];
const headers = [ 'Company Name (Store Name)', 'Store Username' ];


const verifier = [ 'name', 'storeName', 'address', 'maintainer', 'category' ];
const blacklist = [ 'category' ];

const categories = [
  'Grocery Store',
  'Clothing',
  'Retail',
  'Consumer Electronics',
  'Restaurant',
  'Rental',
  'Services',
  'Dealership',
  'Beauty, Cosmetic & Personal Care',
  'Food & Beverages',
  'Cafe & Shop',
  'Technology',
  'Cinema',

]

const MerchantRegister = ({ onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading, setTargetMessage }) => {
  const [ vatRegistered, setVatRegistered ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ preview, setPreview ] = useState(null);
  const [ success, setSuccess ] = useState(false);
  const [ category, setCategory ] = useState(null);

  const [ findUser ] = useMutation(User.Mutations.findUser);
  const [ refreshToken ] = useMutation(User.Mutations.refreshToken);
  const [ registerMerchant ] = useMutation(Merchant.Mutations.register);

  const onDrop = useCallback((files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  }, [ image ]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg, image/webp'
  })

  const formError = () => {
    let formError = false;
    if (formData['category'] == undefined ||
      (formData['category'] !== undefined && formData['category'].value == '')) {
      setTargetMessage('category', 'Please select a category');
      formError = true;
    }
    return formError;
  }
  
  const onSubmit = async () => {
    setLoading(true);

    const error = formError();
    if (error) {
      setLoading(false);
    } else {
      const hasErrors = onFormSubmit();
      findUser({
        variables: { email: formData['maintainer'] !== undefined ? formData['maintainer'].value : null }
      }).then(async res => {
        const { ok } = await res.data.findUser;

        if (!ok) {
          setTargetMessage('maintainer', 'This user does not exist')
          setLoading(false);
        };
        if (!hasErrors && ok) {
          const res = await registerMerchant({
            variables: {
              companyName: formData['name'].value,
              username: formData['storeName'].value,
              address: formData['address'].value,
              logo: image,
              maintainer: formData['maintainer'].value,
              vatRegistered,
              category
            }
          });
          if (res.data.registerMerchant) {
            if (isAuthenticated().ok && (isAuthenticated().email == formData['maintainer'].value)) {
              const newTokenResponse = await refreshToken({ variables: { email: isAuthenticated().email } });
              const { ok, token } = newTokenResponse.data.refreshToken;
              if (ok) {
                localStorage.setItem('token', token);
                sessionStorage.setItem('token', token);
                setLoading(false);
                location.assign('/profile');
              } 
            };
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              location.assign('/');
            }, 1000)
          }
        } else {
          setLoading(false);
        }
      });
    }
  }

  return (
    <div>
      <Common.Headers.Page>Register Merchant</Common.Headers.Page>
      <Message link={null} isOpen={success} message="Store successfully created!" linkText={null} />

      <Layout>
        <Container>
          {
            inputs.map((field, index) => (
              <Common.Form.Wrapper key={index}>
                <Common.Form.Identifier>{headers[index]}</Common.Form.Identifier>
                <Common.Form.Input
                  onKeyPress={e => {
                    if (e.key == 'Enter') {
                      onSubmit()
                    }
                  }}
                  error={formData[field] && formData[field].error.length >=1}
                  name={field}
                  onChange={e => (onInputChange(e), clearInputField(field, e))}
                />
                {
                  (formData[field] && formData[field].error) && (
                    <Animations.FadeIn>
                      <Messages.Error>{formData[field].error}</Messages.Error>
                    </Animations.FadeIn>
                  )
                }
              </Common.Form.Wrapper>
            ))
          }

          <select
            name="category"
            onChange={e => (setCategory(e.target.value), onInputChange(e), clearInputField('category', e))}
            style={{ width: '200px' }}
          >
            <option value='null'>Select category</option>
            {
              categories.map((cat, index) => (
                <option value={cat} key={index}>{cat}</option>
              ))
            }
          </select>
          {
            (formData['category'] && formData['category'].error) && (
              <Animations.FadeIn>
                <Messages.Error>{formData['category'].error}</Messages.Error>
              </Animations.FadeIn>
            )
          }
        </Container>

        <Container>
          <Common.Form.Wrapper>
            <Common.Form.Identifier>Main Store Address</Common.Form.Identifier>
            <Common.Form.Input
              error={formData['address'] && formData['address'].error.length >=1}
              name='address'
              onKeyPress={e => {
                if (e.key == 'Enter') {
                  onSubmit()
                }
              }}
              onChange={e => (onInputChange(e), clearInputField('address', e))}
            />
          </Common.Form.Wrapper>

          <div>
            <Common.Form.Identifier>Store Logo</Common.Form.Identifier>
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
                  <DropImage.Preview src={preview} />
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
          </div>
        </Container>

        <Container>
          <Common.Form.Wrapper style={{ paddingBottom: 0 }}>
            <Common.Form.Identifier>Store Maintainer</Common.Form.Identifier>
            <Common.Form.Input
              error={formData['maintainer'] && formData['maintainer'].error.length >=1}
              name='maintainer'
              onKeyPress={e => {
                if (e.key == 'Enter') {
                  onSubmit()
                }
              }}
              onChange={e => (onInputChange(e), clearInputField('maintainer', e))}
            />
            {
              (formData['maintainer'] && formData['maintainer'].error) && (
                <Animations.FadeIn>
                  <Messages.Error>{formData['maintainer'].error}</Messages.Error>
                </Animations.FadeIn>
              )
            }
          </Common.Form.Wrapper>

          <Common.Description style={{ paddingBottom: 10 }}>
            Can't find maintainer? create an account <Common.Links.Normal to='/'>here</Common.Links.Normal>
          </Common.Description>

          <Common.Form.Check.Wrapper style={{ margin: '15px 0' }}>
            <Common.Form.Check.Input
              onChange={e => (setVatRegistered(!vatRegistered), onInputChange(e), clearInputField('vat', e))}
              name='vat'
              id='vat_field'
            />
            <Common.Form.Check.Label htmlFor='vat_field'>Check This If VAT Registered?</Common.Form.Check.Label>
          </Common.Form.Check.Wrapper>
        </Container>
      </Layout>

      <FormNavigator placeholder="Register" loading={loading} hasErrors={hasErrors} onSubmit={onSubmit} />
    </div>
  )
}

export default FormHOC({ inputs: verifier, blacklist })(MerchantRegister);
