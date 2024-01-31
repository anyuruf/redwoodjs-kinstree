import EditParentCell from 'src/components/Parent/EditParentCell'

type ParentPageProps = {
  id: string
}

const EditParentPage = ({ id }: ParentPageProps) => {
  return <EditParentCell id={id} />
}

export default EditParentPage
