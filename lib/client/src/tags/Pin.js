import gql from 'graphql-tag';

export const GET_FORGOT = gql`
  query($email: String, $password: String) {
    getForgot(email: $email, password: $password)
  }
`


export const SEND_EMAIL = gql`
  mutation($email: String, $password: String) {
    sendEmail(email: $email, password: $password) 
  }
`

export const GET_PIN = gql`
  query($email: String, $password: String) {
    getPin(email: $email, password: $password)
  }
`


export const CREATE_PIN = gql`
  mutation($email: String, $password: String) {
    createPin(email: $email, password: $password) 
  }
`

export const Pin = {
  GET_PIN,
  CREATE_PIN,
  GET_FORGOT,
  SEND_EMAIL
}

