import { Controller } from '@redwoodjs/forms'
import { useDateField } from 'react-aria'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props extends ReactDatePickerProps {
  disabled?: boolean
  className?: string
  errorClassName?: string
  defaultValue?: string | Date
  validation?: {}
  style?: string
}
const DateInput = (props: Props) => {
  const {
    name,
    className,
    errorClassName,
    defaultValue,
    validation,
    style,
    ...propsRest
  } = props

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={validation}
      render={({ field: { onChange, value, onBlur, ref } }) => (
        <DatePicker
          selected={value}
          onBlur={onBlur}
          ref={ref}
          onChange={onChange}
          dateFormat={'MMM d, yyyy'}
          placeholderText="Select birth date"
          {...propsRest}
        />
      )}
    />
  )
}

export default DateInput
