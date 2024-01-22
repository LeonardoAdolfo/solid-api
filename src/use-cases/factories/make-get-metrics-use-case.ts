/* eslint-disable prettier/prettier */
import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-reposirory'


export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase =  new GetUserMetricsUseCase(checkInsRepository)
  return useCase
}
