import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String
    email: String
    name: String
    valid: Boolean
    password: String
    stores: [String]
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
    getMe: User
  }

  type NameResponse {
    ok: Boolean
    token: String
  }

  type Mutation {
    signout: Boolean
    resetPassword(email: String, newPassword: String): Boolean
    findUser(email: String): UserResponse
    refreshToken(email: String): userLoginResponse
    updateName(email: String, name: String): NameResponse
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
