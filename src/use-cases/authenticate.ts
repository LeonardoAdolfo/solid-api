/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
interface AuthtenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthtenticateUseCaseRespoense{
    user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: AuthtenticateUseCaseRequest): Promise<AuthtenticateUseCaseRespoense> {
    // auth
    const user = await this.userRepository.findByEmail(email)

    if(!user){
        throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches){
        throw new InvalidCredentialError()
    }

    return {
        user
    }
  }
}
