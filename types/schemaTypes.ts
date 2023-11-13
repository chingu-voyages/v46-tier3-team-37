// these imports prisma types created by the prisma schema so we dont have to manually create new types every time the shcema changes
import { User as UserPrismaGeneratedType, Item as ItemPrismaGeneratedType, Transaction as TransactionPrismaGeneratedType, Prisma } from "@prisma/client";
//create a default Tool type
export interface Item extends ItemPrismaGeneratedType{
  available?: boolean
}

export type User = UserPrismaGeneratedType 

export type Transaction = TransactionPrismaGeneratedType

const transactionComplete = Prisma.validator<Prisma.TransactionDefaultArgs>()({
  include: { item: { include: {
    images: true
  }}}
})

export type transactionComplete = Prisma.TransactionGetPayload<typeof transactionComplete>

// prisma helper function that creates and validates a joined type
const itemComplete = Prisma.validator<Prisma.ItemDefaultArgs>()({
  include: { images: true, Transaction: true }
})

export type Tool = Prisma.ItemGetPayload<typeof itemComplete>;

// create a type with another prisma helper function to create a join type for itemsWithImages
export interface ItemComplete extends Prisma.ItemGetPayload<typeof itemComplete>{
  available?: boolean
};