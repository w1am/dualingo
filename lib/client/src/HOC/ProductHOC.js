import React, { Component } from 'react';
import { hasEmailErr, hasPhoneErr } from '../utils/formChecker';
import { connect } from 'react-redux';

const ProductHOC = (props) => (WrappedComponent) => {
  console.log(props);

  return class FormHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        spaceError: '',
        hocLoading: false,
        success: false,
        couponError: false,
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

      const addToCart = async (selectedOption, selectedOptionCount, addOption, count, coupon) => {
        this.setState({ hocLoading: true });
        const { product } = this.props;

        const vatAdded = () => {
          const { store, options, addedVAT } = product;
          return store.vatRegistered ? options.length >= 1 ? JSON.parse(selectedOption).addedVAT : addedVAT : 0
        }

        const { store } = product;
        
        if (product.options.length >= 1) {
          let data = {};

          let price = parseFloat(JSON.parse(selectedOption).price + vatAdded());
          if (coupon) {
            let couponValid = await this.props.verifyCoupon({ variables: { store: product.store.username, coupon, id: product.id } });

            if (!couponValid.data.verifyCoupon.ok) {
              this.setState({ couponError: true });
              setTimeout(() => {
                this.setState({ couponError: false });
              }, 3000)
            }

            data = {
              id: product.id,
              title: product.title,
              option: selectedOption ? JSON.parse(selectedOption).name : null,
              addOption: addOption == 'null' ? null : JSON.parse(addOption).name,
              count: parseInt(selectedOptionCount),
              price: couponValid.data.verifyCoupon.ok ? price - (price * (couponValid.data.verifyCoupon.discount * 0.01)) : price,
              subTotal: selectedOptionCount * (JSON.parse(selectedOption).price + vatAdded()),
              session: product.session,
              fileUrl: JSON.parse(selectedOption).fileUrl,
              quantity: parseInt(JSON.parse(selectedOption).quantity),
              delivery: store.delivery,
              deliveryFee: store.deliveryFee
            }
          } else {
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
          }

          if (this.state.couponError == false) {
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

              await this.props.set({
                variables: { storeName: product.store.username, name: product.store.companyName, product: JSON.stringify(data) }
              });
              await this.props.reset();
              await this.props.setSubTotal();
              this.setState({ hocLoading: false, success: true });
              removeState();
            } else {
              this.setState({ spaceError: 'This product is out of stock' })
              this.setState({ hocLoading: false });
            }
          }
        } else {
          const { store } = product;
          let data = {}

          let price = parseFloat(product.price + vatAdded());
          if (coupon) {
            let couponValid = await this.props.verifyCoupon({ variables: { store: product.store.username, coupon, id: product.id } });

            if (!couponValid.data.verifyCoupon.ok) {
              this.setState({ couponError: true });
              setTimeout(() => {
                this.setState({ couponError: false });
              }, 3000)
            }

            data = {
              id: product.id,
              title: product.title,
              option: null,
              addOption: addOption == 'null' ? null : JSON.parse(addOption).name,
              count: parseInt(count),
              price: couponValid.data.verifyCoupon.ok ? price - (price * (couponValid.data.verifyCoupon.discount * 0.01)) : price,
              subTotal: parseFloat(product.price + vatAdded()) * parseInt(count),
              session: product.session,
              fileUrl: '600-main-0',
              quantity: parseInt(product.quantity),
              delivery: store.delivery,
              deliveryFee: store.deliveryFee
            }
          } else {
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
          }

          if (this.state.couponError == false)  {
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

              await this.props.set({
                variables: { storeName: product.store.username, name: product.store.companyName, product: JSON.stringify(data) }
              });
              await this.props.reset();
              await this.props.setSubTotal();
              this.setState({ hocLoading: false, success: true });
              removeState();
            } else {
              this.setState({ spaceError: 'This product is out of stock' });
              this.setState({ hocLoading: false });
            }
          }
        }
      }

      const myProps = {
        addToCart,
        spaceError: this.state.spaceError,
        hocLoading: this.state.hocLoading,
        cartSuccess: this.state.success,
        couponError: this.state.couponError,
        resetCart
      }

      return (
        <WrappedComponent {...myProps} {...this.props} />
      )
    }
  }
}

export default ProductHOC;
