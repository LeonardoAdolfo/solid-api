/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string,
    page: number
  
}

interface FetchUserCheckInsHistoryUseCaseRespoense{
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {

  constructor(private checkInsReppository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseRespoense> {

    const checkIns = await this.checkInsReppository.findyManyByUserId(userId, page)
    

    return {
      checkIns,
    }
  }
}
