import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import { QUERY } from 'src/components/Member/MembersCell'
import { dateTag, formatEnum, truncate } from 'src/lib/formatters'

import type { DeleteMemberMutationVariables, FindMembers } from 'types/graphql'

const DELETE_MEMBER_MUTATION = gql`
  mutation DeleteMemberMutation($id: String!) {
    deleteMember(id: $id) {
      id
    }
  }
`

const MembersList = ({ members }: FindMembers) => {
  const [selectedRows, setSelectedRows] = useState([])

  const handleCheckboxChange = (memberId: string) => {
    // Check if the memberId is already in the selectedRows array
    if (selectedRows.includes(memberId)) {
      // If yes, remove it
      setSelectedRows(selectedRows.filter((id) => id !== memberId))
    } else {
      // If no, add it
      setSelectedRows([...selectedRows, memberId])
    }
  }

  const [deleteMember] = useMutation(DELETE_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Member deleted')
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

  const onDeleteClick = (id: DeleteMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete member ' + id + '?')) {
      deleteMember({ variables: { id } })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Tribe clan</th>
            <th>Gender</th>
            <th>Birth date</th>
            <th>Death date</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <input
                  className="form-check-input border-success"
                  type="checkbox"
                  value={member.id}
                  onChange={() => handleCheckboxChange(member.id)}
                  checked={selectedRows.includes(member.id)}
                />
              </td>
              <td>{truncate(member.firstName)}</td>
              <td>{truncate(member.lastName)}</td>
              <td>{truncate(member.tribeClan)}</td>
              <td>{formatEnum(member.gender)}</td>
              <td>{dateTag(member.birthDate)}</td>
              <td>{dateTag(member.deathDate)}</td>
              <td>{truncate(member.description)}</td>
              <td>
                <nav className="d-flex align-content-between gap-1">
                  <Link
                    to={routes.member({ id: member.id })}
                    title={'Show member ' + member.id + ' detail'}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMember({ id: member.id })}
                    title={'Edit member ' + member.id}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete member ' + member.id}
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDeleteClick(member.id)}
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

export default MembersList
