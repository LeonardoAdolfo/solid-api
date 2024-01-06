/* eslint-disable prettier/prettier */
import {  expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExsistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(()=>{
     usersRepository = new InMemoryUsersRepository()
     sut = new RegisterUseCase(usersRepository)
  })
  it('it should be able to register', async () => {
    

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoee@gmail.com',
      password: '123456',
    })

  

    expect(user.id).toEqual(expect.any(String))
  })


  it('should hash user upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoee@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
        '123456',
        user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not  be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

   await expect(() =>
   sut.execute({
      name: 'John Doe',
      email,
      password: '12345654',
    }),
   ).rejects.toBeInstanceOf(UserAlreadyExsistsError)
  })
})
