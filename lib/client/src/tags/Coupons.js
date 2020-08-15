import gql from 'graphql-tag';

export const GET_COUPONS = gql`
  query($store: String) {
    getCoupons(store: $store) {
      id
      store
      month
      day
      year
      code
      discount
      used
    }
  }
`

export const VERIFY_COUPON = gql`
  mutation(
    $store: String
    $coupon: String
    $id: String
  ) {
    verifyCoupon(
      store: $store
      coupon: $coupon
      id: $id
    ) {
      ok
      discount
    }
  }
`

export const CREATE_COUPON = gql`
  mutation(
    $discount: Float
    $code: String
    $products: String
    $store: String
    $duration: Int
  ) {
    createCoupon(
      discount: $discount
      code: $code
      products: $products
      store: $store
      duration: $duration
    )
  }
`

export const Coupons = {
  CREATE_COUPON,
  GET_COUPONS,
  VERIFY_COUPON
}

