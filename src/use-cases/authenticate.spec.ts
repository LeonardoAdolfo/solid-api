/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authentcate Use Case', () => {
    beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
    })

  it('it should be able to authenticate', async () => {
    

    await usersRepository.create({
        name: 'john doe',
        email: 'johndoee@gmail.com',
        password_hash: await hash('123456',6),
    })

    const { user } = await sut.execute({
      email: 'johndoee@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('it should not be able to authenticate with wrong email', async () => {
    expect(()=>
    sut.execute({
        email: 'johndoee@gmail.com',
        password: '123456',
      })
  
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('it should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
        name: 'john doe',
        email: 'johndoee@gmail.com',
        password_hash: await hash('123456',6),
    })

    expect(()=>
    sut.execute({
        email: 'johndoee@gmail.com',
        password: '12seqwe3456',
      })
  
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
