import type { Member } from '@prisma/client'

import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'
import type { StandardScenario } from './members.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('members', () => {
  scenario('returns all members', async (scenario: StandardScenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario: StandardScenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async () => {
    const result = await createMember({
      input: {
        id: 'String',
        firstName: 'String',
        lastName: 'String',
        gender: 'male',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.gender).toEqual('male')
  })

  scenario('updates a member', async (scenario: StandardScenario) => {
    const original = (await member({ id: scenario.member.one.id })) as Member
    const result = await updateMember({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a member', async (scenario: StandardScenario) => {
    const original = (await deleteMember({
      id: scenario.member.one.id,
    })) as Member
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
