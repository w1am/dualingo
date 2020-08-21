import React, { useEffect, useState, useRef } from 'react';
import { Styles } from '../styles';
import Identifiers from '../containers/upload/Identifiers';
import ProductDetails from '../containers/upload/ProductDetails';
import Inventory from '../containers/upload/Inventory';
import Page from '../containers/upload/Page';
import Options from '../containers/upload/Options';
import ProductImage from '../containers/upload/ProductImage';
import OptionTable from '../containers/upload/OptionTable';
import AddOptions from '../containers/upload/AddOptions';
import ButtonLoader from '../components/loaders/ButtonLoader';
import { objLen } from '../utils/formatters';
import queryString from 'query-string'
import { isAuthenticated } from '../utils/verifyUser';
import { Tags } from '../tags';
import { useMutation, useQuery } from '@apollo/react-hooks';
import FormNavigator from '../components/navigators/FormNavigator';
import { categories } from '../shared/categories';
import { formatNumber } from '../utils/productItemFormatter';

const { Common } = Styles;
const { Media, Product } = Tags;

const inputs = [ 'title', 'price', 'previousPrice', 'quantity', 'purchaseLimit', 'addOptions', 'addOptionTitle', 'identifiers', 'mainImage', 'options' ]
const blacklist = [ 'addOptions', 'addOptionTitle', 'identifiers', 'mainImage', 'options' ];

import FormHOC from '../HOC/FormHOC';

const UploadPage = ({
  onInputChange, onFormSubmit, clearInputField, hasErrors, formData, loading, setLoading, setTargetMessage, setCustomValue,
  location: { search }, match: { params: { storeName } }
}) => {
  const values = queryString.parse(search);

  const [ session, setSession ] = useState(Date.now());
  const [ image, setImage ] = useState([]);
  const [ list, setList ] = useState([]);
  const [ uploads, setNewUpload ] = useState([]);
  const [ checked, setChecked ] = useState(false);
  const [ addOption, setAddOption ] = useState('');
  const [ addOptionError, setAddOptionError ] = useState('');
  const [ page, setPage ] = useState('Latest');

  const [ optionPrice, setOptionPrice ] = useState({});
  const [ optionPreviousPrice, setOptionPreviousPrice ] = useState({});
  const [ optionQuantity, setOptionQuantity ] = useState({});
  const [ optionFileUrl, setOptionFileUrl ] = useState({});

  const [ tempPrice, setTempPrice ] = useState("0.00");
  const [ tempPreviousPrice, setTempPreviousPrice ] = useState("0.00");

  const [ optionTempPrice, setOptionTempPrice ] = useState({});
  const [ optionTempPreviousPrice, setOptionTempPreviousPrice ] = useState({});

  const [ customOptions, setCustomOptions ] = useState([]);
  const [ customOption, setCustomOption ] = useState({});
  const [ tempCustomOption, setTempCustomOption ] = useState({});

  const [ix, setIx] = useState(0);

  const [ checkDir ] = useMutation(Media.Mutations.checkDir);
  const [ uploadFile ] = useMutation(Media.Mutations.uploadFile);
  const [ upload ] = useMutation(Media.Mutations.upload);
  const [ createProduct ] = useMutation(Product.Mutations.createProduct);

  const { loading: productLoading, data: productData } = useQuery(Tags.Product.Queries.getProduct, {
    variables: { id: values.id }
  });

  useEffect(() => {
    if (productLoading) {
    } else {
      const { getProduct: product } = productData;

      if (product) {
        setSession(values.session);
        let loadedList = [];
        product.categories.map(category => {
          const position = categories.map(cat => cat.name).indexOf(category);
          if (position > -1) {
            loadedList.push({ name: category, id: position })
          };
        })
        setList(loadedList)
        setIx(product.addOptions.length)

        setTimeout(() => {
          setCustomValue('title', '', product.title);
          setCustomValue('price', '', product.price);
          setCustomValue('previousPrice', '', product.previousPrice);
          setCustomValue('quantity', '', product.quantity);
          setCustomValue('purchaseLimit', '', product.purchaseLimit);
          setCustomValue('addOptionTitle', '', product.addOptionTitle);
        }, 0);
        setTempPrice(formatNumber(product.price));
        setTempPreviousPrice(formatNumber(product.previousPrice));
        setPage(product.page);

        // PRODUCT IMAGE
        let tempImage = [];
        product.fileUrl.map(file => tempImage.push({ name: file, type: 'url' }))
        setImage(tempImage);

        // OPTIONS
        let tempOptions = [];
        let prices = Object.assign({});
        let tempPrices = Object.assign({});
        let quantities = Object.assign({});
        let previousPrices = Object.assign({});
        let tempPreviousPrices = Object.assign({});
        let fileUrls = Object.assign({});

        product.options.map((option, i) => {
          tempOptions.push({ key: Math.random(), value: option.name })
          prices[i] = option.price;
          tempPrices[i] = formatNumber(option.price);
          quantities[i] = option.quantity;
          previousPrices[i] = option.previousPrice;
          tempPreviousPrices[i] = formatNumber(option.previousPrice);
          fileUrls[i] = option.fileUrl;
        });

        setNewUpload(tempOptions);
        setOptionPrice(prices);
        setOptionTempPrice(tempPrices);
        setOptionQuantity(quantities)
        setOptionPreviousPrice(previousPrices);
        setOptionTempPreviousPrice(tempPreviousPrices);
        setOptionFileUrl(fileUrls);

        // ADD OPTIONS
        let tempAddOptions = [];
        let cusX = Object.assign({});
        let tempCusX = Object.assign({});
        if (product.addOptions.length >= 1) {
          setChecked(true);
          product.addOptions.map((addOption, i) => {
            tempAddOptions.push({ key: Math.random(), value: addOption.name });
            cusX[i] = { name: addOption.name, price: addOption.price };
            tempCusX[i] = { name: addOption.name, price: formatNumber(addOption.price) }
          })
        }

        setCustomOption(cusX);
        setTempCustomOption(tempCusX);
        setCustomOptions(tempAddOptions);
      }
    }
  }, [ productData ])

  const checkOptionsError = () => {
    let error = false;
    // if (uploads.length !== objLen(optionFileUrl)) {
    //   setTargetMessage('options', 'Please add an image');
    //   error = true;
    // };
    for (let i=0; i<=uploads.length-1; i++) {
      if (optionPreviousPrice[i] < optionPrice[i]) {
        setTargetMessage('options', 'Previous price must be higher than price after');
        error = true;
      }
    }
    return error;
  }

  const checkFormError = () => {
    let formError = false;
    const isEmpty = formData['previousPrice'] !== undefined && formData['price'] !== undefined;
    if (
      checked && formData['addOptionTitle'] == undefined ||
      (checked && formData['addOptionTitle'] !== undefined && formData['addOptionTitle'].value == '')
    ) {
      setTargetMessage('addOptionTitle', 'Additional option cannot be left empty if checked');
      formError = true;
    };
    if (checked && customOptions.length <= 0) {
      setTargetMessage('addOptions', 'Additional options cannot be left empty');
      formError = true;
    };
    if ((isEmpty && formData['previousPrice'].value.toString() == '0') || (isEmpty && formData['price'].value.toString() == '0')) {
      setTargetMessage('price', 'Price should be higher than 0');
      setTargetMessage('previousPrice', 'Price before should be higher than 0');
      formError = true;
    };
    if (isEmpty && formData['previousPrice'].value <= formData['price'].value) {
      setTargetMessage('previousPrice', 'Previous price must be higher than price after')
      formError = true;
    };
    return formError;
  }

  const checkListError = () => {
    if (list.length <= 0) {
      setTargetMessage('identifiers', 'Please add at least 1 identifiers');
      return true
    };
    return false;
  }

  const inventoryError = () => {
    let error = false;
    if (formData['quantity'] !== undefined && formData['quantity'].value.toString() == "0") {
      setTargetMessage('quantity', 'This field is required');
      error = true;
    };
    if (formData['purchaseLimit'] !== undefined && formData['purchaseLimit'].value.toString() == "0") {
      setTargetMessage('purchaseLimit', 'This field is required');
      error = true;
    };

    return error;
  }

  const checkAssets = () => {
    if (image.length <= 0) {
      setTargetMessage('mainImage', 'Please add at least one image of your product');
      return true
    }
    return false;
  }

  const onSubmit = async () => {
    setLoading(true);

    let hasEdit = false;
    if (values.editState && values.editState == 'true') { hasEdit = true }
    let submitError = onFormSubmit();
    let formError = checkFormError();

    // Display error messages //
    setTimeout(() => (checkFormError(), inventoryError(), checkAssets(), checkOptionsError()), 0);

    if (checkListError()) {
      scrollToRef(identifiersRef);
    } else if (submitError || inventoryError()) {
      scrollToRef(productDetailsRef);
    } else if (formError) {
      scrollToRef(productDetailsRef);
    } else if (checkAssets() || checkOptionsError()) {
      scrollToRef(mediaRef);
    };
    if (submitError || formError || checkAssets() || inventoryError() || checkOptionsError()) {
      setLoading(false);
    } else {
      let userOptions = [];
      let tempList = '';
      let prevPrice = formData['previousPrice'].value;
      let addUserOptions = [];

      list.map((item, index) => tempList += (item.name + ','));
      tempList = tempList.slice(0, -1);

      if (customOptions.length >= 1) {
        Object.keys(customOption).forEach(x => {
          addUserOptions.push({
            name: customOption[x].name,
            price: parseFloat(customOption[x].price),
          });
        })
      }

      if (uploads.length >= 1) {
        for (let x=0; x<=uploads.length-1; x++) {
          let path;
          if (typeof optionFileUrl[x] == 'object') {
            if (process.env.NODE_ENV === 'development') {
              const res = await checkDir({
                variables: {
                  storeName,
                  isLogo: false,
                  isCover: false,
                  session: values.editState == 'true' ? values.session : session.toString()
                }
              });
            }

            let uploadFileRes = await upload({
              variables: {
                file: optionFileUrl[x],
                storeName,
                isLogo: false,
                isCover: false,
                session: values.editState == 'true' ? values.session : session.toString(),
                type: `option-${x}`
              }
            });

            path = uploadFileRes.data.upload;
          } else {
            path = optionFileUrl[x];
          };
          userOptions.push({
            name: uploads[x].value,
            price: parseFloat(optionPrice[x]),
            previousPrice: parseFloat(optionPreviousPrice[x]),
            discount: parseInt(((optionPreviousPrice[x] - optionPrice[x]) / optionPreviousPrice[x]) * 100),
            addedVAT: parseFloat(15 * 0.01 * optionPrice[x]),
            quantity: parseInt(optionQuantity[x]),
            fileUrl: JSON.stringify(path)
          });
        };
      }

      let paths = [];
      for (let i=0; i<image.length; i++) {
        let path;
        if (image[i].type == 'url') {
          console.log(1);
          path = image[i].name;
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log(2);
            const res = await checkDir({
              variables: {
                storeName,
                isLogo: false,
                isCover: false,
                session: values.editState == 'true' ? values.session : session.toString()
              }
            });
          }

          console.log(3);
          let uploadFileRes = await upload({
            variables: {
              file: image[i],
              storeName,
              isLogo: false,
              isCover: false,
              session: values.editState == 'true' ? values.session : session.toString(),
              type: `main-${i}`
            }
          });
          console.log('uploadFileRes', uploadFileRes);
          path = uploadFileRes.data.upload;
        }
        paths.push(path);
      }

      console.log('paths', paths)

      const res = await createProduct({
        variables: {
          title: formData['title'].value,
          price: parseFloat(formData['price'].value),
          previousPrice: parseFloat(prevPrice),
          discount: parseInt(((formData['previousPrice'].value - formData['price'].value) / formData['previousPrice'].value) * 100),
          quantity: parseInt(formData['quantity'].value),
          addedVAT: 15 * 0.01 * formData['price'].value,
          fileUrl: JSON.stringify(paths),
          options: JSON.stringify(userOptions),
          addOptionTitle: formData['addOptionTitle'] !== undefined ? formData['addOptionTitle'].value : '',
          addOptions: JSON.stringify(addUserOptions),
          storeName,
          purchaseLimit: parseInt(formData['purchaseLimit'].value),
          category: tempList,
          hasEdit,
          productId: (values.editState && values.editState == 'true') ? values.id : null,
          page ,
          session: values.editState == 'true' ? values.session : session.toString()
        }
      });

      const { id, ok } = res.data.createProduct;

      if (ok) {
        setLoading(false);
        location.assign(`/merchant/${storeName}/product/update/description?id=${id}&editState=${values.editState == undefined ? 'false' : values.editState}`)
      } else {
        setLoading(false);
        window.location.reload();
      }

    }
  }

  const identifiersRef = useRef(null)
  const productDetailsRef = useRef(null)
  const mediaRef = useRef(null)

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50)   

  return (
    <div style={{ marginBottom: '8em' }}>
      <Common.Headers.Page>Upload Product</Common.Headers.Page>
      <Common.Presentation ref={identifiersRef}>
        <Identifiers clearInputField={clearInputField} formData={formData} list={list} setList={setList}  />
      </Common.Presentation>
      <br />
      <Common.Presentation ref={productDetailsRef}>
        <ProductDetails
          setTempPreviousPrice={setTempPreviousPrice}
          tempPreviousPrice={tempPreviousPrice}
          tempPrice={tempPrice}
          setTempPrice={setTempPrice}
          setCustomValue={setCustomValue}
          formData={formData}
          onInputChange={onInputChange}
          clearInputField={clearInputField}
        />
        <Inventory formData={formData} onInputChange={onInputChange} clearInputField={clearInputField} setCustomValue={setCustomValue} />
        <Page page={page} setPage={setPage} />
      </Common.Presentation>
      <br />
      <Common.Presentation ref={mediaRef} >
        <Common.Headers.Identifier>Media</Common.Headers.Identifier>
        <ProductImage clearInputField={clearInputField} formData={formData} image={image} setImage={setImage} />
        <Common.Headers.Identifier>Main Options</Common.Headers.Identifier>
        <Options
          uploads={uploads}
          setNewUpload={setNewUpload}
          optionPrice={optionPrice}
          setOptionPrice={setOptionPrice}
          optionPreviousPrice={optionPreviousPrice}
          setOptionPreviousPrice={setOptionPreviousPrice}
          optionQuantity={optionQuantity}
          setOptionQuantity={setOptionQuantity}
          formData={formData}
        />

        <OptionTable
          name={storeName}

          uploads={uploads}
          setNewUpload={setNewUpload}

          optionPrice={optionPrice}
          optionQuantity={optionQuantity}
          optionPreviousPrice={optionPreviousPrice}
          optionFileUrl={optionFileUrl}
          setOptionPrice={setOptionPrice}
          setOptionPreviousPrice={setOptionPreviousPrice}
          setOptionQuantity={setOptionQuantity}
          setOptionFileUrl={setOptionFileUrl}

          tempPrice={tempPrice}
          tempPreviousPrice={tempPreviousPrice}

          optionTempPrice={optionTempPrice}
          setOptionTempPrice={setOptionTempPrice}

          optionTempPreviousPrice={optionTempPreviousPrice}
          setOptionTempPreviousPrice={setOptionTempPreviousPrice}

          session={values.session}
          formData={formData}
          clearInputField={clearInputField}
        />

        <br />
        <Common.Headers.Identifier>Additional Options</Common.Headers.Identifier>
        <Common.Form.Check.Input
          checked={checked}
          id='checkbox_id'
          onChange={e => {
            setChecked(!checked);
            setTimeout(() => {
              clearInputField('addOptions');
              clearInputField('addOptionTitle');
            }, 0)
          }}
        />
        <Common.Form.Check.Label htmlFor='checkbox_id'>Add additional options</Common.Form.Check.Label>

        <AddOptions
          checked={checked}
          addOption={addOption}
          setAddOption={setAddOption}
          customOptions={customOptions}
          setCustomOptions={setCustomOptions}
          customOption={customOption}
          setCustomOption={setCustomOption}
          tempCustomOption={tempCustomOption}
          setTempCustomOption={setTempCustomOption}
          onInputChange={onInputChange}
          clearInputField={clearInputField}
          formData={formData}
          ix={ix}
          setIx={setIx}
        />

      </Common.Presentation>

      <FormNavigator conditions={() => false} onSubmit={onSubmit} loading={loading} hasErrors={hasErrors} placeholder="Next" />

    </div>
  )
}

export default FormHOC({ inputs, blacklist })(UploadPage);
