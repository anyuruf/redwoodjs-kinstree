import { Link, routes } from '@redwoodjs/router'
import { InputField, Form } from '@redwoodjs/forms'

type KinstreeAppLayoutProps = {
  children?: React.ReactNode
}

const KinstreeAppLayout = ({ children }: KinstreeAppLayoutProps) => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <Link to={routes.home()} className="navbar-brand text-light">
            Kinstree
          </Link>
          <Form className="d-flex" role="search">
            <InputField
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </Form>
        </div>
      </nav>
      {children}
    </div>
  )
}

export default KinstreeAppLayout
