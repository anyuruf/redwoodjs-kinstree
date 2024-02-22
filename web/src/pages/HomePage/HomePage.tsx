import { Metadata } from '@redwoodjs/web'
import { Suspense } from 'react'
import Spinner from 'src/components/Spinner/Spinner'

const myData = {
  nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
  links: [
    { source: 'a', target: 'b' },
    { source: 'c', target: 'a' },
  ],
}

const HomePage = () => {
  const ForceGraph = React.lazy(() => import('src/lib/ForceGraph'))
  return (
    <>
      <Metadata title="Kinstree" description="Home page" />
      <div className="container-fluid h-100 row">
        <div className="col-md-8 col-lg-9">
          <Suspense fallback={<Spinner />}>
            <ForceGraph graphData={myData} />
          </Suspense>
        </div>
        <div className="col-md-4 col-lg-3">Place holder</div>
      </div>
    </>
  )
}

export default HomePage
