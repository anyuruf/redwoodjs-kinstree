import { useQuery } from '@redwoodjs/web'
import { Suspense } from 'react'
import Spinner from '../Spinner/Spinner'
import { graphData } from 'types/graphql'
import { registerFragment } from '@redwoodjs/web/dist/apollo/fragmentRegistry'
import _cloneDeep from 'lodash/cloneDeep'
// import { MemberFragment } from 'src/fragments/members'
// import { ParentFragment } from 'src/fragments/parents'

const ForceGraph = React.lazy(() => import('src/lib/ForceGraph'))

const ParentFragment = registerFragment(
  gql`
    fragment ParentFragment on Parent {
      id
      source
      target
    }
  `
)

const MemberFragment = registerFragment(
  gql`
    fragment MemberFragment on Member {
      id
      firstName
      lastName
      tribeClan
      gender
      birthDate
      deathDate
      description
      avatarUrl
    }
  `
)

export const GET_DATA_GRAPH_QUERY = gql`
  query graphData {
    nodes: members {
      ...MemberFragment
    }
    links: parents {
      ...ParentFragment
    }
  }
`

export const HomeResource = () => {
  const { data, loading } = useQuery<graphData>(GET_DATA_GRAPH_QUERY)
  if (loading) {
    return <Spinner />
  }

  if (data) {
    // Make apollo result data object extensible
    const gData = _cloneDeep(data)
    return (
      <Suspense fallback={<Spinner />}>
        <ForceGraph graphData={gData} />
      </Suspense>
    )
  }
}
