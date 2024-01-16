/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
interface GetUserMetricsUseCaseRequest {
    userId: string,
  
}

interface GetUserMetricsUseCaseRespoense{
    checkInsCount: number
}

export class GetUserMetricsUseCase {

  constructor(private checkInsReppository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseRespoense> {

    const checkInsCount = await this.checkInsReppository.countByUserId(userId)
    

    return {
        checkInsCount,
    }
  }
}
