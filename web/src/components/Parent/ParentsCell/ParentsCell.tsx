import type { FindParents } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Parents from 'src/components/Parent/Parents'
import Spinner from 'src/components/Spinner/Spinner'

export const QUERY = gql`
  query FindParents {
    parents {
      id
      source
      target
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No parents yet. '}
      <Link to={routes.newParent()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ parents }: CellSuccessProps<FindParents>) => {
  return <Parents parents={parents} />
}
