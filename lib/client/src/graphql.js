import gql from "graphql-tag";

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

