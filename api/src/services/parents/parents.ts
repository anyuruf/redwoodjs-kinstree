import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const parents: QueryResolvers['parents'] = () => {
  return db.parent.findMany()
}

export const parent: QueryResolvers['parent'] = ({ id }) => {
  return db.parent.findUnique({
    where: { id },
  })
}

export const createParent: MutationResolvers['createParent'] = ({ input }) => {
  return db.parent.create({
    data: input,
  })
}

export const updateParent: MutationResolvers['updateParent'] = ({
  id,
  input,
}) => {
  return db.parent.update({
    data: input,
    where: { id },
  })
}

export const deleteParent: MutationResolvers['deleteParent'] = ({ id }) => {
  return db.parent.delete({
    where: { id },
  })
}
