import { test, expect, describe, it } from 'vitest'
import { RegisteruseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'


describe('Register Use Case', ()=>{
    it('should hash user upon registration', async ()=>{
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisteruseCase(prismaUsersRepository)

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password:'123456'
        })

        console.log(user.password_hash)

    })
})