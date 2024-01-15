/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gyms Use Case', () => {
  beforeEach(()=>{
     gymsRepository = new inMemoryGymsRepository()
     sut = new CreateGymUseCase(gymsRepository)
  })
  it('it should be able to register', async () => {
    

    const { gym } = await sut.execute({
     title: 'JavaScript Gym',
     description: null,
     phone: null,
     latitude: -27.2092052,
     longitude: -49.6401091
    })

  

    expect(gym.id).toEqual(expect.any(String))
  })

})
