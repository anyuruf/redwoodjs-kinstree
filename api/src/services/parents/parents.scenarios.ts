import type { Prisma, Parent } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ParentCreateArgs>({
  parent: {
    one: { data: { id: 'String', source: 'String', target: 'String' } },
    two: { data: { id: 'String', source: 'String', target: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Parent, 'parent'>
