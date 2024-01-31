import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteParentMutationVariables,
  FindParentById,
} from 'types/graphql'

const DELETE_PARENT_MUTATION = gql`
  mutation DeleteParentMutation($id: String!) {
    deleteParent(id: $id) {
      id
    }
  }
`

interface Props {
  parent: NonNullable<FindParentById['parent']>
}

const Parent = ({ parent }: Props) => {
  const [deleteParent] = useMutation(DELETE_PARENT_MUTATION, {
    onCompleted: () => {
      toast.success('Parent deleted')
      navigate(routes.parents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteParentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete parent ' + id + '?')) {
      deleteParent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Parent {parent.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{parent.id}</td>
            </tr>
            <tr>
              <th>Source</th>
              <td>{parent.source}</td>
            </tr>
            <tr>
              <th>Target</th>
              <td>{parent.target}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editParent({ id: parent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(parent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Parent
