import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Parent/ParentsCell'
import { truncate } from 'src/lib/formatters'

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
    if (confirm('Are you sure you want to delete parent ' + id + '?')) {
      deleteParent({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Source</th>
            <th>Target</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent.id}>
              <td>{truncate(parent.id)}</td>
              <td>{truncate(parent.source)}</td>
              <td>{truncate(parent.target)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.parent({ id: parent.id })}
                    title={'Show parent ' + parent.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editParent({ id: parent.id })}
                    title={'Edit parent ' + parent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete parent ' + parent.id}
                    className="rw-button rw-button-small rw-button-red"
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
