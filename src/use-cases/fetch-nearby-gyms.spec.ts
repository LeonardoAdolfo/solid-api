/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetach Nearby Gyms Use Case', () => {
  beforeEach(async ()=>{
    gymsRepository = new inMemoryGymsRepository()
     sut = new FetchNearbyGymsUseCase(gymsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    
    await gymsRepository.create({
        title: 'Near Gyms',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
        
    })

    await gymsRepository.create({
        title: 'Far Gyms',
        description: null,
        phone: null,
        latitude: -27.0610928,
        longitude: -49.5229501
    })

    const { gyms } = await sut.execute({
      userLatidude: -27.2092052,
      userLongitude: -49.6401091,
    })

  

    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
        expect.objectContaining({title: 'Near Gyms'}),
    ])
  })
})
