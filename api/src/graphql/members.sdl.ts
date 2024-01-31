export const schema = gql`
  type Member {
    id: String!
    firstName: String!
    lastName: String!
    tribeClan: String
    gender: Gender!
    birthDate: DateTime
    deathDate: DateTime
    description: String
    avatarUrl: String
  }

  enum Gender {
    male
    female
  }

  type Query {
    members: [Member!]! @requireAuth
    member(id: String!): Member @requireAuth
  }

  input CreateMemberInput {
    id: String!
    firstName: String!
    lastName: String!
    tribeClan: String
    gender: Gender!
    birthDate: DateTime
    deathDate: DateTime
    description: String
    avatarUrl: String
  }

  input UpdateMemberInput {
    firstName: String
    lastName: String
    tribeClan: String
    gender: Gender
    birthDate: DateTime
    deathDate: DateTime
    description: String
    avatarUrl: String
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member! @requireAuth
    updateMember(id: String!, input: UpdateMemberInput!): Member! @requireAuth
    deleteMember(id: String!): Member! @requireAuth
  }
`
