import { DateField, FieldError, Label, useRegister } from '@redwoodjs/forms'

interface Props extends Date {
  name: string
  defaultValue?: string
  label: string
}
const DateInput = (props: Props) => {
  const { name, defaultValue, label } = props
  const register = useRegister({
    name,
  })

  return (
    <div className="row mb-3">
      <Label
        name={name}
        className="form-label fw-bold"
        errorClassName="form-label fw-bold text-danger"
      >
        {label}
      </Label>
      <DateField
        defaultValue={defaultValue}
        className="form-control"
        errorClassName="form-control border-danger"
        {...register}
      />
      <FieldError name={name} className="list-group-item fw-bold text-danger" />
    </div>
  )
}

export default DateInput
