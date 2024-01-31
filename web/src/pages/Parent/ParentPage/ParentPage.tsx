import ParentCell from 'src/components/Parent/ParentCell'

type ParentPageProps = {
  id: string
}

const ParentPage = ({ id }: ParentPageProps) => {
  return <ParentCell id={id} />
}

export default ParentPage
