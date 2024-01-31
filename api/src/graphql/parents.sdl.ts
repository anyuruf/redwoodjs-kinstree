export const schema = gql`
  type Parent {
    id: String!
    source: String!
    target: String!
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
    updateParent(id: String!, input: UpdateParentInput!): Parent! @requireAuth
    deleteParent(id: String!): Parent! @requireAuth
  }
`
