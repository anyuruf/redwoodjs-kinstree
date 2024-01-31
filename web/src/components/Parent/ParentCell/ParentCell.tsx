import type { FindParentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Parent from 'src/components/Parent/Parent'

export const QUERY = gql`
  query FindParentById($id: String!) {
    parent: parent(id: $id) {
      id
      source
      target
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Parent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ parent }: CellSuccessProps<FindParentById>) => {
  return <Parent parent={parent} />
}
