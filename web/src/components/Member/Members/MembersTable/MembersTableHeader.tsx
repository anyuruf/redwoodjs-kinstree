import React from 'react'

const MembersTableHeader = () => {
  const titles = [
    { title: '#' },
    { title: 'First name' },
    { title: 'Last name' },
    { title: 'Kingdom Clan' },
    { title: 'Gender' },
    { title: 'Nationality' },
    { title: 'Birth date' },
    { title: 'Death date' },
    { title: 'Description' },
  ]
  return (
    <thead>
      <tr>
        {titles.map((ttl) => {
          return <th key={ttl.title}>{ttl.title}</th>
        })}
        <th>&nbsp;</th>
      </tr>
    </thead>
  )
}

export default MembersTableHeader
