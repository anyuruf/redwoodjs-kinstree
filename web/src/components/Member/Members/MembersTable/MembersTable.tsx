import React from 'react'
import MembersTableHeader from './MembersTableHeader'
import MembersTableBody from './MembersTableBody'

const MembersTable = ({
  members,
  handleCheckboxChange,
  selectedRows,
  deleteUser,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped align-middle">
        <MembersTableHeader />
        <MembersTableBody
          members={members}
          handleCheckboxChange={handleCheckboxChange}
          selectedRows={selectedRows}
          deleteUser={deleteUser}
        />
      </table>
    </div>
  )
}

export default MembersTable
