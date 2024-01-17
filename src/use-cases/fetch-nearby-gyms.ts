/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface FetchNearbyGymsUseCaseRequest {
    userLatidude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatidude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
        latitude: userLatidude,
        longitude: userLongitude
    })


    return {
      gyms,
    }
  }
  
}

