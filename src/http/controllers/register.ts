/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisteruseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExsistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try{
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase =  new RegisteruseCase(usersRepository)

    await registerUseCase.execute({
        name,
        email,
        password
    })

  } catch (err) {
    if(err instanceof UserAlreadyExsistsError){
      reply.status(409).send({ message: err.message })
    }
    throw err 
    
  }
  return reply.status(201).send()
}
