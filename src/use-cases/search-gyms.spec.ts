/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { execPath } from 'process'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async ()=>{
    gymsRepository = new inMemoryGymsRepository()
     sut = new SearchGymsUseCase(gymsRepository)
  })
  it('should be able to seach for gyms', async () => {
    
    await gymsRepository.create({
        title: 'JavaScript Gyms',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
        
    })

    await gymsRepository.create({
        title: 'TypeScrript Gyms',
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

  

    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
        expect.objectContaining({title: 'JavaScript Gyms'}),
    ])
  })
  it('should be able fetch paginated gym search', async () => {
    
    for(let i = 1; i <= 22; i++ ){
        await gymsRepository.create({
            title: `JavaScript Gyms ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })
    
    }
    
    const { gyms } = await sut.execute({
      query: `JavaScript Gyms`,
      page: 2
    })

  

    await expect(gyms).toHaveLength(2)
    await expect(gyms).toEqual([
        expect.objectContaining({title: 'JavaScript Gyms 21'}),
        expect.objectContaining({title: 'JavaScript Gyms 22'})
    ])
  })
})
