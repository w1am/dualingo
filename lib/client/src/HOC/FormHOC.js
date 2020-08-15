import React, { Component } from 'react';
import { hasEmailErr, hasPhoneErr } from '../utils/formChecker';

const FormHOC = (props) => (WrappedComponent) => {
  return class FormHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: {},
        hasErrors: false,
        loading: false,
      }
    }

    render() {
      const setLoading = (state) => this.setState({ loading: state });

      const setCustomValue = (target, error, value) => {
        let formObj = Object.assign({}, this.state.formData);
        formObj[target] = { value, error };
        this.setState({ formData: formObj })
      };

      const setTargetMessage = (target, error) => {
        let formObj = Object.assign({}, this.state.formData);
        formObj[target] = { value: '', error };
        this.setState({ formData: formObj })
      };

      const onInputChange = (e) => {
        this.setState({ hasErrors: false });
        let formObj = Object.assign({}, this.state.formData);
        formObj[e.target.name] = { value: e.target.value, error: '' };
        this.setState({ formData: formObj })
      };

      const clearInputField = (key, e) => {
        let formObj = Object.assign({}, this.state.formData);
        formObj[key] = { value: e ? e.target.value : this.state.formData[key] !== undefined ? this.state.formData[key].value : '', error: '' };
        this.setState({ formData: formObj, hasErrors: false })
      }

      const onFormSubmit = () => {
        let hasErrors = false;
        let password;
        let confirmPassword;
        let formObj = Object.assign({}, this.state.formData);
        const inputs = props.inputs;
        const blacklist = props.blacklist || [];

        inputs.forEach(input => {
          if (blacklist.indexOf(input) < 0) {
            if (formObj[input] == undefined || (formObj[input] !== undefined && formObj[input].value == '')) {
              formObj[input] = { value: '', error: 'This field is required' };
              this.setState({ formData: formObj });
              hasErrors = true;
            };
            if ((input === 'email' && formObj[input] !== undefined) && hasEmailErr(formObj['email'].value)) {
              formObj[input] = { value: '', error: 'Invalid email address' };
              this.setState({ formData: formObj });
              hasErrors = true
            };
            if ((input === 'phone' && formObj[input] !== undefined) && hasPhoneErr(formObj['phone'].value)) {
              formObj[input] = { value: '', error: 'Invalid phone number' };
              this.setState({ formData: formObj });
              hasErrors = true
            };
            if (input == 'password' && formObj['password'] !== undefined) {
              password = formObj['password'].value
            };
            if (input == 'confirmPassword' && formObj['confirmPassword'] !== undefined) {
              confirmPassword = formObj['confirmPassword'].value
            };
          }
        });

        if ((inputs.indexOf('confirmPassword') > -1 && password !== confirmPassword)) {
          if ((inputs.indexOf('confirmPassword') > -1) && (inputs.indexOf('password') > -1)) {
            formObj['confirmPassword'] = { value: '', error: 'Passwords do not match' };
            this.setState({ formData: formObj });
          }
          hasErrors = true
        }

        this.setState({ hasErrors: true });
        return hasErrors;
      }

      const myProps = {
        onInputChange,
        onFormSubmit,
        clearInputField,
        loading: this.state.loading,
        setLoading,
        setTargetMessage,
        setCustomValue,
        hasErrors: this.state.hasErrors,
        formData: this.state.formData
      }

      return (
        <WrappedComponent {...myProps} {...this.props} />
      )
    }
  }
}

export default FormHOC;
