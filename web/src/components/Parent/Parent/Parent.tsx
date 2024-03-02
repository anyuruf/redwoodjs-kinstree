import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'

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
    <FormWrapper title={`Parent ${parent.id} details`}>
      <table className="table">
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
      <nav className="d-flex fw-bold justify-content-center gap-2">
        <Link
          to={routes.editParent({ id: parent.id })}
          className="btn btn-outline-primary btn-sm"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDeleteClick(parent.id)}
        >
          Delete
        </button>
      </nav>
    </FormWrapper>
  )
}

export default Parent
