import {
  AriaButtonOptions,
  mergeProps,
  useButton,
  useFocus,
  usePress,
} from 'react-aria'
import { ReactNode, useRef } from 'react'
import { Submit } from '@redwoodjs/forms'

interface Props extends AriaButtonOptions<'button'> {
  disabled?: boolean
  className?: string
  children: ReactNode
}

const ButtonInput = (props: Props) => {
  let ref = useRef()
  let { buttonProps } = useButton(props, ref)
  let { pressProps } = usePress(props)
  let { focusProps } = useFocus(props)
  let { children, disabled, className } = props

  return (
    <Submit
      ref={ref}
      disabled={disabled}
      className={className}
      {...mergeProps(buttonProps, pressProps, focusProps)}
    >
      {children}
    </Submit>
  )
}

export default ButtonInput
