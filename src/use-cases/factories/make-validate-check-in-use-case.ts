/* eslint-disable prettier/prettier */
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-reposirory'
import { ValidateCheckInUseCase } from '../validate-check-in'


export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase =  new ValidateCheckInUseCase(checkInsRepository)
  return useCase
}
