import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation($email: String, $newPassword: String) {
    resetPassword(email: $email, newPassword: $newPassword)
  }
`

export const REGISTER_USER_MUTATION = gql`
  mutation($email: String, $name: String, $password: String) {
    registerUser(email: $email, name: $name, password: $password) {
      ok
      error {
        message
      }
    }
  }
`

export const LOGIN_USER_MUTATION = gql`
  mutation($email: String, $password: String, $save: Boolean) {
    loginUser(email: $email, password: $password, save: $save) {
      ok
      token
      error {
        message
      }
    }
  }
`

export const FIND_USER_MUTATION = gql`
  mutation($email: String) {
    findUser(email: $email) {
      ok
      user {
        id
        email
        name
      }
    }
  }
`

export const REFRESH_USER_TOKEN_MUTATION = gql`
  mutation($email: String) {
    refreshToken(email: $email) {
      ok
      token
      error {
        message
      }
    }
  }
`

export const UPDATE_NAME_MUTATION = gql`
  mutation($email: String, $name: String) {
    updateName(email: $email, name: $name)
  }
`

export const User = {
  REGISTER_USER_MUTATION,
  LOGIN_USER_MUTATION,
  FIND_USER_MUTATION,
  REFRESH_USER_TOKEN_MUTATION,
  RESET_PASSWORD_MUTATION,
  UPDATE_NAME_MUTATION
}

