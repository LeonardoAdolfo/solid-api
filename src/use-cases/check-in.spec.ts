/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorys'
import { CheckInUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { string } from 'zod'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

let checkInsUseCase: InMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async ()=>{
    checkInsUseCase = new InMemoryCheckInsRepository()
    gymsRepository = new inMemoryGymsRepository()
     sut = new CheckInUseCase(checkInsUseCase, gymsRepository)
 

    await gymsRepository.create({
      id: 'gym-01',
      title:'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0
    })

     vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    
    

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0
    })

  

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    
    vi.setSystemTime(new Date(2022, 0, 20, 8,0,0))

    await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0
    })

    await expect(()=>
        sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
          })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in on distant gym', async () => {
    
    gymsRepository.items.push({
      id: 'gym-02',
      title:'JavaScript Gym',
      description: '',
      phone: '',
      latitude:new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672)
    }) 

    await expect(()=> sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
