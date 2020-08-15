import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String
    email: String
    name: String
    valid: Boolean
    password: String
  }

  type userRegisterResponse {
    ok: Boolean
    error: Error
  }

  type userLoginResponse {
    ok: Boolean
    token: String
    error: Error
  }

  type UserResponse {
    ok: Boolean
    user: User
  }

  type Query {
    signout: Boolean
  }

  type Mutation {
    resetPassword(email: String, newPassword: String): Boolean
    findUser(email: String): UserResponse
    refreshToken(email: String): userLoginResponse
    updateName(email: String, name: String): Boolean
    loginUser(
      email: String
      password: String
      save: Boolean
    ): userLoginResponse
    registerUser(
      email: String
      name: String
      password: String
    ) : userRegisterResponse
  }
`
