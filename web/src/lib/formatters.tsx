import React from 'react'

import humanize from 'humanize-string'
import { DateFormatterOptions, useDateFormatter } from 'react-aria'

const MAX_STRING_LENGTH = 16

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = ''

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value))
    output = humanizedValues.join(', ')
  } else if (typeof values === 'string') {
    output = humanize(values)
  }

  return output
}

export const formatDateForInput = (value?: string) => {
  if (value && value.indexOf('T') >= 0) {
    return value.split('T')[0]
  }
}

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? ''

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }

  return output
}

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = ''

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {new Date(dateTime).toUTCString()}
      </time>
    )
  }

  return output
}

export const dateTag = (dateString?: string) => {
  if (!dateString) return
  const options: DateFormatterOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const formatter = useDateFormatter(options)
  const date = new Date(dateString)
  return <p>{formatter.format(date)}</p>
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}
