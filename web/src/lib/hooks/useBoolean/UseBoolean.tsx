import { useState } from 'react'

const UseBoolean = () => {
  const [cond, setCond] = useState<boolean>(false)

  const turnTrue = () => {
    setCond(true)
  }

  const turnFalse = () => {
    setCond(false)
  }

  return {
    cond,
    turnTrue,
    turnFalse,
  }
}

export default UseBoolean
