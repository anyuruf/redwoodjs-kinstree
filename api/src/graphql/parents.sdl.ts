export const schema = gql`
  type Parent {
    id: String!
    source: String!
    target: String!
  }

  type cpResponse {
    count: Int
  }

  type Query {
    parents: [Parent!]! @requireAuth
    parent(id: String!): Parent @requireAuth
  }

  input CreateParentInput {
    id: String!
    source: String!
    target: String!
  }

  input UpdateParentInput {
    source: String
    target: String
  }

  type Mutation {
    createParent(input: CreateParentInput!): Parent! @requireAuth
    createParents(input: [CreateParentInput!]!): cpResponse! @requireAuth
    updateParent(id: String!, input: UpdateParentInput!): Parent! @requireAuth
    deleteParent(id: String!): Parent! @requireAuth
  }
`
