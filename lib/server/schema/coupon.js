import { gql } from 'apollo-server-express';

export default gql`
  type Coupon {
    id: String
    store: String
    month: String
    day: String
    year: String
    code: String
    discount: Float
    used: Int
  }

  type Query {
    getCoupons(store: String): [Coupon] 
  }

  type CouponResponse {
    ok: Boolean
    discount: Float
  }
  
  type Mutation {
    verifyCoupon(store: String, coupon: String, id: String): CouponResponse
    createCoupon(
      discount: Float
      code: String
      products: String
      store: String
      duration: Int
    ): Boolean 
  }
`
