import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { nanoid } from 'nanoid'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'

import ParentForm from 'src/components/Parent/ParentForm'

import type { CreateParentInput } from 'types/graphql'

const CREATE_PARENT_MUTATION = gql`
  mutation CreateParentMutation($input: CreateParentInput!) {
    createParent(input: $input) {
      id
    }
  }
`

const NewParent = () => {
  const [createParent, { loading, error }] = useMutation(
    CREATE_PARENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Parent created')
        navigate(routes.parents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (data: CreateParentInput) => {
    const parent = {
      // wrap object in input for the server to read the input variables otherwise a bug
      input: {
        id: nanoid(),
        ...data,
      },
    }
    createParent({ variables: { ...parent } })
  }

  return (
    <FormWrapper title="Add New Parent">
      <ParentForm onSave={onSave} loading={loading} error={error} />
    </FormWrapper>
  )
}

export default NewParent
