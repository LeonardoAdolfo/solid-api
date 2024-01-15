/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundError } from './errors/resourse-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'
interface CheckInUseCaseRequest {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
}

interface CheckInUseCaseRespoense{
    checkIn: CheckIn
}

export class CheckInUseCase {

  constructor(private checkInsReppository: CheckInsRepository,private gymsRepository: GymsRepository) {}

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseRespoense> {

    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) {
      throw new ResourceNotFoundError()
    }

    //
    const disctance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const  MAX_DISTANCE_IN_KILOMETERS = 0.1

    if(disctance> MAX_DISTANCE_IN_KILOMETERS){
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsReppository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if(checkInOnSameDay){
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsReppository.create({
        gym_id: gymId,
        user_id: userId
    })
    

    return {
        checkIn
    }
  }
}
