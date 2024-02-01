import type { EditMemberById, UpdateMemberInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MemberForm from 'src/components/Member/MemberForm'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'
import Spinner from 'src/components/Spinner/Spinner'

export const QUERY = gql`
  query EditMemberById($id: String!) {
    member: member(id: $id) {
      id
      firstName
      lastName
      tribeClan
      gender
      birthDate
      deathDate
      description
      avatarUrl
    }
  }
`
const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMemberMutation($id: String!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      firstName
      lastName
      tribeClan
      gender
      birthDate
      deathDate
      description
      avatarUrl
    }
  }
`

export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ member }: CellSuccessProps<EditMemberById>) => {
  const [updateMember, { loading, error }] = useMutation(
    UPDATE_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Member updated')
        navigate(routes.members())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateMemberInput,
    id: EditMemberById['member']['id']
  ) => {
    updateMember({ variables: { id, input } })
  }

  return (
    <FormWrapper title={`Edit Member ${member.id}`}>
      <MemberForm
        member={member}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </FormWrapper>
  )
}
