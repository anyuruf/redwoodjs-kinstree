import MemberCell from 'src/components/Member/MemberCell'

type MemberPageProps = {
  id: string
}

const MemberPage = ({ id }: MemberPageProps) => {
  return <MemberCell id={id} />
}

export default MemberPage
