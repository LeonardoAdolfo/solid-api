/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositorys'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async ()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
     sut = new GetUserMetricsUseCase(checkInsRepository)
  })
  it('should be able get check-in count from metrics', async () => {
    
    await checkInsRepository.create({
        gym_id: 'gym-02',
        user_id: 'User-01'
    })

    await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'User-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'User-01',
    })

  

    await expect(checkInsCount).toEqual(2)
  })
})
