import { User as UserP, Item as ItemP, Prisma } from "@prisma/client";

export type Tool = ItemP

export type User = UserP

const itemWithImages = Prisma.validator<Prisma.ItemDefaultArgs>()({
  include: { images: true }
})

export type ItemWithImages = Prisma.ItemGetPayload<typeof itemWithImages>;

export function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}