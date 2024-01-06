/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourse-not-found'
interface GetUserProfileUseCaseRequest {
    userId: string
}
interface GetUserProfileUseCaseRespoense{
    user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseRespoense> {
    // auth
    const user = await this.userRepository.findById(userId)

    if(!user){
        throw new ResourceNotFoundError()
    }

    return {
        user
    }
  }
}
