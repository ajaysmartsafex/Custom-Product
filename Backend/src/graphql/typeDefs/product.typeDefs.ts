import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    price: Float!
    stock: Int
    images: [String]
    category: String
    createdBy: User
    createdAt: String
  }

  input ProductInput {
    title: String!
    description: String
    price: Float!
    stock: Int
    images: [String]
    category: String
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
`;
