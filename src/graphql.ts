import { gql } from 'apollo-boost';

export const ReviewQuery = gql`
query ReviewList($offset: Int!, $first: Int!, $passkey: UUID!, $productId: String) {
  reviewOutQuery(offset: $offset, first: $first, passkey: $passkey, productId: $productId) {
    comment
    countryCode
    createdAt
    date
    deletedAt
    email
    files
    id
    name
    orderId
    productId
    source
    starRating
    status
    title
    updatedAt
    totalLikes
    totalDislikes
    businessPayload {
      id
      name
      webLogo
    }
    webHookEventPayload {
      etc
      order
      product
      template {
        body
      }
      user
    }
  totalReviewForThisProduct
  averageReviewOfThisProduct
  }
}
`;
