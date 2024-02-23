import { Link, routes } from '@redwoodjs/router'
import React from 'react'
import { dateTag, formatEnum, truncate } from 'src/lib/formatters'
import { Member } from 'types/graphql'

const MembersTableBody = ({
  members,
  handleCheckboxChange,
  selectedRows,
  deleteUser,
}) => {
  return (
    <tbody>
      {members.map((member: Member) => (
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
          <td>{truncate(member.nationality)}</td>
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
                onClick={() => deleteUser(member.id)}
              >
                Delete
              </button>
            </nav>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default MembersTableBody
