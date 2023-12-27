/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExsistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaserequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisteruseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaserequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
  
    
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExsistsError
    }
  
    // const prismaUsersRepository = new PrismaUsersRepository()
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })


    return {
      user,
    }
  }
  
}

