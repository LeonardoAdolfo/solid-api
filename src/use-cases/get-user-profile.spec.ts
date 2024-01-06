/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach } from 'vitest'
import {  hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resourse-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
    })

  it('it should be able to get user profile', async () => {
    

    const createdUser = await usersRepository.create({
        name: 'john doe',
        email: 'johndoee@gmail.com',
        password_hash: await hash('123456',6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    await expect(user.name).toEqual('john doe')
  })

  it('it should not be able to get user profile with wrong id', async () => {
    expect(()=>
    sut.execute({
        userId:'non-existing-id'
      })
  
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})
