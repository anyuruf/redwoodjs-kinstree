import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Parent/ParentsCell'

import type { DeleteParentMutationVariables, FindParents } from 'types/graphql'

const DELETE_PARENT_MUTATION = gql`
  mutation DeleteParentMutation($id: String!) {
    deleteParent(id: $id) {
      id
    }
  }
`

const ParentsList = ({ parents }: FindParents) => {
  const [deleteParent] = useMutation(DELETE_PARENT_MUTATION, {
    onCompleted: () => {
      toast.success('Parent deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteParentMutationVariables['id']) => {
    if (confirm('You sure want to delete parent ' + id + '?')) {
      deleteParent({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>Id</th>
            <th>Parent Id</th>
            <th>Child Id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent.id}>
              <td>{parent.id}</td>
              <td>{parent.source}</td>
              <td>{parent.target}</td>
              <td>
                <nav className="d-flex align-content-between gap-1">
                  <Link
                    to={routes.parent({ id: parent.id })}
                    title={'Show parent ' + parent.id + ' detail'}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editParent({ id: parent.id })}
                    title={'Edit parent ' + parent.id}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete parent ' + parent.id}
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteClick(parent.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ParentsList
