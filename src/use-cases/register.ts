/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaserequest {
  name: string
  email: string
  password: string
}

export class RegisteruseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaserequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  
    if (userWithSameEmail) {
      throw new Error("E-mail already exists")
    }
  
    // const prismaUsersRepository = new PrismaUsersRepository()
  
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
  
}

