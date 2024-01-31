import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { nanoid } from 'nanoid'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'

import MemberForm from 'src/components/Member/MemberForm'

import type { CreateMemberInput, Gender } from 'types/graphql'

const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMemberMutation($input: CreateMemberInput!) {
    createMember(input: $input) {
      id
    }
  }
`

const NewMember = () => {
  const [createMember, { loading, error }] = useMutation(
    CREATE_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Member created')
        navigate(routes.members())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (data: CreateMemberInput) => {
    const member = {
      // wrap object in input for the server to read the input variables otherwise a bug
      input: {
        id: nanoid(),
        ...data,
      },
    }
    createMember({ variables: { ...member } })
  }

  return (
    <FormWrapper title="Add Family Member">
      <MemberForm onSave={onSave} loading={loading} error={error} />
    </FormWrapper>
  )
}

export default NewMember
