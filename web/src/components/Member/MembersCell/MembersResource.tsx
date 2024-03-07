import type { FindMembers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { type CellFailureProps, useQuery } from '@redwoodjs/web'

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

export const MembersCell = () => {
  const { data, loading, error } = useQuery<FindMembers>(QUERY)

  const isEmpty = () => {
    data.members.length === 0
  }

  if (loading) {
    return <Spinner />
  }

  if (isEmpty)
    () => {
      return (
        <div className="h5 fw-bold text-center">
          {'No members yet. '}
          <Link to={routes.newMember()} className="link-secondary">
            {'Create one?'}
          </Link>
        </div>
      )
    }

  if (error)
    ({ error }: CellFailureProps) => (
      <div className="fw-bold text-danger">{error?.message}</div>
    )

  if (data) return <Members members={data.members} />
}

// MembersCell.fragment = {
//   members: gql`
//     fragment MemberFragment on Member {
//       id
//       firstName
//       lastName
//       tribeClan
//       gender
//       birthDate
//       deathDate
//       description
//       avatarUrl
//     }
//   `,
// }
