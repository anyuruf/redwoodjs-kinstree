import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const members: QueryResolvers['members'] = () => {
  return db.member.findMany()
}

export const member: QueryResolvers['member'] = ({ id }) => {
  return db.member.findUnique({
    where: { id },
  })
}

export const createMember: MutationResolvers['createMember'] = ({ input }) => {
  return db.member.create({
    data: input,
  })
}

export const updateMember: MutationResolvers['updateMember'] = ({
  id,
  input,
}) => {
  return db.member.update({
    data: input,
    where: { id },
  })
}

export const deleteMember: MutationResolvers['deleteMember'] = ({ id }) => {
  return db.member.delete({
    where: { id },
  })
}
