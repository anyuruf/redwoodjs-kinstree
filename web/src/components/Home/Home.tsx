import { HomeResource } from './HomeResource'

const Home = () => {
  return (
    <div className="container-fluid h-100 row">
      <div className="col-md-8 col-lg-9">
        <HomeResource />
      </div>
      <div className="col-md-4 col-lg-3">Place holder</div>
    </div>
  )
}

export default Home
