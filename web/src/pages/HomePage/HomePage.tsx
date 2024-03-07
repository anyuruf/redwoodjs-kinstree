import { Metadata } from '@redwoodjs/web'
import { Suspense } from 'react'
import Home from 'src/components/Home/Home'
import Spinner from 'src/components/Spinner/Spinner'

const myData = {
  nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
  links: [
    { source: 'a', target: 'b' },
    { source: 'c', target: 'a' },
  ],
}

const HomePage = () => {
  // const ForceGraph = React.lazy(() => import('src/lib/ForceGraph'))
  return (
    <>
      <Metadata title="Home Page" description="Home page" />
      <Home />
    </>
  )
}

export default HomePage
