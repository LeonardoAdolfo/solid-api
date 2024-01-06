/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExsistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface CreateGymUseCaserequest {
  title: string
  description: string | null

}

interface CreateGymUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({  }: CreateGymUseCaserequest): Promise<CreateGymUseCaseResponse> {
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

