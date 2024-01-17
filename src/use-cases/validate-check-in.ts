/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resourse-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-valitation-error'
interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseRespoense{
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {

  constructor(private checkInsReppository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseRespoense> {

    const checkIn = await this.checkInsReppository.findById(checkInId)

    if(!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
        checkIn.created_at,
        'minutes',
    )

    if(distanceInMinutesFromCheckInCreation>20){
        throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsReppository.save(checkIn)

    return {
        checkIn
    }
  }
}
