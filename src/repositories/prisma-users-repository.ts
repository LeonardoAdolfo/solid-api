/* eslint-disable prettier/prettier */
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
/* eslint-disable prettier/prettier */
export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
