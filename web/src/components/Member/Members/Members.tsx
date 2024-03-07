import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { QUERY } from 'src/components/Member/MembersCell/MembersResource'
import type { DeleteMemberMutationVariables, FindMembers } from 'types/graphql'
import MembersTable from './MembersTable/MembersTable'

const DELETE_MEMBER_MUTATION = gql`
  mutation DeleteMemberMutation($id: String!) {
    deleteMember(id: $id) {
      id
    }
  }
`

const MembersList = ({ members }: FindMembers) => {
  // selectedId variable is used by the delete mutation
  // const [selectedId, setSelectedId] =
  //   useState<DeleteMemberMutationVariables['id']>(null)
  const [selectedRows, setSelectedRows] = useState<
    DeleteMemberMutationVariables['id'][]
  >([])

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

  const deleteUser = (id: DeleteMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete Member ' + id + '?')) {
      deleteMember({ variables: { id } })
    }
  }

  return (
    <MembersTable
      members={members}
      handleCheckboxChange={handleCheckboxChange}
      selectedRows={selectedRows}
      deleteUser={deleteUser}
    />
  )
}

export default MembersList
