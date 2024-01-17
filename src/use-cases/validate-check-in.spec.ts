/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorys'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resourse-not-found'
import { LateCheckInValidationError } from './errors/late-check-in-valitation-error'


let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async ()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
 
     sut = new ValidateCheckInUseCase(checkInsRepository)
 
    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })
  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    await expect(checkIn.validated_at).toEqual(expect.any(Date))
    await expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    
    await expect(sut.execute({
        checkInId: 'inexistent-check-in-id'
      })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(()=> sut.execute({
        checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError)

  })

})
