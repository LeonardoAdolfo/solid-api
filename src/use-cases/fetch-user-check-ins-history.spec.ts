/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorys'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { execPath } from 'process'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Checkin History Use Case', () => {
  beforeEach(async ()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
     sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })
  it('should be able fetch check-in history', async () => {
    
    await checkInsRepository.create({
        gym_id: 'gym-02',
        user_id: 'User-01'
    })

    await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'User-01'
    })

    const { checkIns } = await sut.execute({
      userId: 'User-01',
      page: 1
    })

  

    await expect(checkIns).toHaveLength(2)
    await expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-02'}),
        expect.objectContaining({gym_id: 'gym-01'})
    ])
  })
  it('should be able fetch paginated check-in history', async () => {
    
    for(let i = 1; i <= 22; i++ ){
        await checkInsRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'User-01'
        })
    
    }
    
    const { checkIns } = await sut.execute({
      userId: 'User-01',
      page: 2
    })

  

    await expect(checkIns).toHaveLength(2)
    await expect(checkIns).toEqual([
        expect.objectContaining({gym_id: 'gym-21'}),
        expect.objectContaining({gym_id: 'gym-22'})
    ])
  })
})
