import { render } from '@redwoodjs/testing/web'

import KinstreeAppLayout from './KinstreeAppLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('KinstreeAppLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KinstreeAppLayout />)
    }).not.toThrow()
  })
})
