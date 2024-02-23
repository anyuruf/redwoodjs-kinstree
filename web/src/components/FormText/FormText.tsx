import { FieldError, Label, TextField, useRegister } from '@redwoodjs/forms'
import React from 'react'

const FormText = (props: {
  name: string
  label: string
  defaultValue: string | string[] | number
  validation?: {}
}) => {
  const { name, label, defaultValue, validation } = props
  const register = useRegister({
    name,
    validation,
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

      <TextField
        defaultValue={defaultValue}
        className="form-control"
        errorClassName="form-control border-danger"
        {...register}
      />

      <FieldError name={name} className="list-group-item fw-bold text-danger" />
    </div>
  )
}

export default FormText
