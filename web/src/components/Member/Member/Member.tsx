import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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
      <div className="container">
        <header className="">
          <h2 className="h5 fw-bold">Member {member.id} Detail</h2>
        </header>
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
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMember({ id: member.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(member.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Member
