import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="container-fluid">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <nav className="navbar">
        <h1 className="h6 fw-bold text-center">
          <Link to={routes[titleTo]()} className="link-dark">
            {title}
          </Link>
        </h1>
        <Link to={routes[buttonTo]()} className="d-flex gap-1 btn btn-success">
          <span className="fw-bold">+</span> {buttonLabel}
        </Link>
      </nav>
      <main className="container-fluid">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
