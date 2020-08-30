import React, { Component } from 'react';
import { hasEmailErr, hasPhoneErr } from '../utils/formChecker';
import { connect } from 'react-redux';
import { setCookie, getCookie } from '../utils/cookies';

const ProductHOC = (props) => (WrappedComponent) => {
  return class FormHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        spaceError: '',
        hocLoading: false,
        success: false,
        buyLoading: false
      }
    }

    render() {
      const resetCart = async () => {
        this.setState({ success: false })
      }

      const removeState = () => {
        setTimeout(() => {
          this.setState({ success: false })
        }, 1800)
      }

      const addToCart = async (selectedOption, selectedOptionCount, addOption, count, coupon, buy) => {
        if (buy) {
          this.setState({ buyLoading: true });
        } else {
          this.setState({ hocLoading: true });
        }
        const { product } = this.props;

        const vatAdded = () => {
          const { store, options, addedVAT } = product;
          return store.vatRegistered ? options.length >= 1 ? JSON.parse(selectedOption).addedVAT : addedVAT : 0
        }

        const { store } = product;
        
        if (product.options.length >= 1) {
          try {
            let data = {};

            let price = parseFloat(JSON.parse(selectedOption).price + vatAdded());
            data = {
              id: product.id,
              title: product.title,
              option: selectedOption ? JSON.parse(selectedOption).name : null,
              addOption: addOption == 'null' ? null : JSON.parse(addOption).name,
              count: parseInt(selectedOptionCount),
              price,
              subTotal: selectedOptionCount * (JSON.parse(selectedOption).price + vatAdded()),
              session: product.session,
              fileUrl: JSON.parse(selectedOption).fileUrl,
              quantity: parseInt(JSON.parse(selectedOption).quantity),
              delivery: store.delivery,
              deliveryFee: store.deliveryFee
            }

            let hasSpace = await this.props.checkStock({
              variables: {
                productId: product.id,
                selectedOption: selectedOption ? JSON.parse(selectedOption).name : null,
                selectedCount: parseInt(selectedOptionCount)
              }
            })

            if (hasSpace.data.checkStock == true) {
              this.props.addItem(product.store.username, product.store.companyName, { ...data })
              this.props.resetCount();
              this.props.getSubTotal();

              this.props.set({
                variables: {
                  storeName: product.store.username,
                  name: product.store.companyName,
                  product: JSON.stringify(data)
                }
              });
              this.props.reset();
              this.props.setSubTotal();
              this.setState({ hocLoading: false, success: true, buyLoading: false });
              removeState();
            } else {
              this.setState({ spaceError: 'This product is out of stock' })
              this.setState({ hocLoading: false, buyLoading: false });
            }
          } catch(e) {
            if (e) {
              console.log(e);
              this.setState({ hocLoading: false, buyLoading: false, success: false });
            }
          }
        } else {
          try {
            const { store } = product;
            let data = {}

            let price = parseFloat(product.price + vatAdded());
            data = {
              id: product.id,
              title: product.title,
              option: null,
              addOption: addOption == 'null' ? null : JSON.parse(addOption).name,
              count: parseInt(count),
              price,
              subTotal: parseFloat(product.price + vatAdded()) * parseInt(count),
              session: product.session,
              fileUrl: '600-main-0',
              quantity: parseInt(product.quantity),
              delivery: store.delivery,
              deliveryFee: store.deliveryFee
            }

            let hasSpace = await this.props.checkStock({
              variables: {
                productId: product.id,
                selectedOption: null,
                selectedCount: parseInt(count),
              }
            })

            if (hasSpace.data.checkStock == true) {
              this.props.addItem(product.store.username, product.store.companyName, { ...data })
              this.props.resetCount();
              this.props.getSubTotal();

              this.props.set({
                variables: { storeName: product.store.username, name: product.store.companyName, product: JSON.stringify(data) }
              });
              this.props.reset();
              this.props.setSubTotal();
              this.setState({ hocLoading: false, success: true, buyLoading: false });
              removeState();
            } else {
              this.setState({ spaceError: 'This product is out of stock' });
              this.setState({ hocLoading: false, buyLoading: false, success: false });
            }
          } catch(e) {
            if (e) {
              console.log(e);
              this.setState({ hocLoading: false, buyLoading: false, success: false });
            }
          }
        }
      }

      const myProps = {
        addToCart,
        spaceError: this.state.spaceError,
        hocLoading: this.state.hocLoading,
        buyLoading: this.state.buyLoading,
        cartSuccess: this.state.success,
        resetCart
      }

      return (
        <WrappedComponent {...myProps} {...this.props} />
      )
    }
  }
}

export default ProductHOC;
