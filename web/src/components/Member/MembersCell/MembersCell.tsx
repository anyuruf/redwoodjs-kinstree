import type { FindMembers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Members from 'src/components/Member/Members'
import Spinner from 'src/components/Spinner/Spinner'

export const QUERY = gql`
  query FindMembers {
    members {
      id
      firstName
      lastName
      tribeClan
      gender
      nationality
      birthDate
      deathDate
      description
      avatarUrl
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="h5 fw-bold text-center">
      {'No members yet. '}
      <Link to={routes.newMember()} className="link-secondary">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="fw-bold text-danger">{error?.message}</div>
)

export const Success = ({ members }: CellSuccessProps<FindMembers>) => {
  return <Members members={members} />
}
