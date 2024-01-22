/* eslint-disable prettier/prettier */
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-reposirory'


export function makeFetchUserCheckInHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase =  new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  return useCase
}
