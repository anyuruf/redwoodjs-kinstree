const FormWrapper = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-header bg-secondary h6 text-center text-light fw-bold card-title">
        {title}
      </div>
      <div className="card-body m-2 m-md-4">{children}</div>
    </div>
  )
}

export default FormWrapper
