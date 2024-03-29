import type { EditParentById, UpdateParentInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ParentForm from 'src/components/Parent/ParentForm'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'
import Spinner from 'src/components/Spinner/Spinner'

export const QUERY = gql`
  query EditParentById($id: String!) {
    parent: parent(id: $id) {
      id
      source
      target
    }
  }
`
const UPDATE_PARENT_MUTATION = gql`
  mutation UpdateParentMutation($id: String!, $input: UpdateParentInput!) {
    updateParent(id: $id, input: $input) {
      id
      source
      target
    }
  }
`

export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ parent }: CellSuccessProps<EditParentById>) => {
  const [updateParent, { loading, error }] = useMutation(
    UPDATE_PARENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Parent updated')
        navigate(routes.parents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateParentInput,
    id: EditParentById['parent']['id']
  ) => {
    updateParent({ variables: { id, input } })
  }

  return (
    <FormWrapper title={`Edit Parent ${parent.id}`}>
      <ParentForm
        parent={parent}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </FormWrapper>
  )
}
