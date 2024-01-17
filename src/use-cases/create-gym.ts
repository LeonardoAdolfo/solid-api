/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExsistsError } from './errors/user-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface CreateGymUseCaserequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ title , description, phone, latitude, longitude}: CreateGymUseCaserequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title , description, phone, latitude, longitude
    })


    return {
      gym,
    }
  }
  
}
