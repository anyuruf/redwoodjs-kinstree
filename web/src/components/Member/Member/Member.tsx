import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import FormWrapper from 'src/components/FormWrapper/FormWrapper'

import { dateTag, formatEnum } from 'src/lib/formatters'

import type {
  DeleteMemberMutationVariables,
  FindMemberById,
} from 'types/graphql'

const DELETE_MEMBER_MUTATION = gql`
  mutation DeleteMemberMutation($id: String!) {
    deleteMember(id: $id) {
      id
    }
  }
`

interface Props {
  member: NonNullable<FindMemberById['member']>
}

const Member = ({ member }: Props) => {
  const [deleteMember] = useMutation(DELETE_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Member deleted')
      navigate(routes.members())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete member ' + id + '?')) {
      deleteMember({ variables: { id } })
    }
  }

  return (
    <>
      <FormWrapper title={`Member ${member.id} details`}>
        <table className="table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{member.id}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{member.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{member.lastName}</td>
            </tr>
            <tr>
              <th>Tribe clan</th>
              <td>{member.tribeClan}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{formatEnum(member.gender)}</td>
            </tr>
            <tr>
              <th>Birth date</th>
              <td>{dateTag(member.birthDate)}</td>
            </tr>
            <tr>
              <th>Death date</th>
              <td>{dateTag(member.deathDate)}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{member.description}</td>
            </tr>
            <tr>
              <th>Avatar url</th>
              <td>{member.avatarUrl}</td>
            </tr>
          </tbody>
        </table>

        <nav className="d-flex justify-content-center gap-2">
          <Link
            to={routes.editMember({ id: member.id })}
            className="btn btn-outline-primary btn-sm"
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDeleteClick(member.id)}
          >
            Delete
          </button>
        </nav>
      </FormWrapper>
    </>
  )
}

export default Member
