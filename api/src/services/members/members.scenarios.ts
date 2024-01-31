import type { Prisma, Member } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MemberCreateArgs>({
  member: {
    one: {
      data: {
        id: 'String',
        firstName: 'String',
        lastName: 'String',
        gender: 'male',
      },
    },
    two: {
      data: {
        id: 'String',
        firstName: 'String',
        lastName: 'String',
        gender: 'male',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Member, 'member'>
