import type { Parent } from '@prisma/client'

import {
  parents,
  parent,
  createParent,
  updateParent,
  deleteParent,
} from './parents'
import type { StandardScenario } from './parents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('parents', () => {
  scenario('returns all parents', async (scenario: StandardScenario) => {
    const result = await parents()

    expect(result.length).toEqual(Object.keys(scenario.parent).length)
  })

  scenario('returns a single parent', async (scenario: StandardScenario) => {
    const result = await parent({ id: scenario.parent.one.id })

    expect(result).toEqual(scenario.parent.one)
  })

  scenario('creates a parent', async () => {
    const result = await createParent({
      input: { id: 'String', source: 'String', target: 'String' },
    })

    expect(result.id).toEqual('String')
    expect(result.source).toEqual('String')
    expect(result.target).toEqual('String')
  })

  scenario('updates a parent', async (scenario: StandardScenario) => {
    const original = (await parent({ id: scenario.parent.one.id })) as Parent
    const result = await updateParent({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a parent', async (scenario: StandardScenario) => {
    const original = (await deleteParent({
      id: scenario.parent.one.id,
    })) as Parent
    const result = await parent({ id: original.id })

    expect(result).toEqual(null)
  })
})
