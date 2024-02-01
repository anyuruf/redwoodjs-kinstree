import type { FindMemberById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query FindMemberById($id: String!) {
    member: member(id: $id) {
      id
      firstName
      lastName
      tribeClan
      gender
      birthDate
      deathDate
      description
      avatarUrl
    }
  }
`

export const Loading = () => (
  <div className="spinner-border" text-secondary role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
)

export const Empty = () => <div>Member not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="fw-bold text-danger">{error?.message}</div>
)

export const Success = ({ member }: CellSuccessProps<FindMemberById>) => {
  return <Member member={member} />
}
