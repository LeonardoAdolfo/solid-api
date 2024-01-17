/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchManyBy(query, page)


    return {
      gyms,
    }
  }
  
}

