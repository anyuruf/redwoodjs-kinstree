import EditMemberCell from 'src/components/Member/EditMemberCell'

type MemberPageProps = {
  id: string
}

const EditMemberPage = ({ id }: MemberPageProps) => {
  return <EditMemberCell id={id} />
}

export default EditMemberPage
