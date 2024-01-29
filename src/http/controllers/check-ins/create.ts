/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

  const createCheckInBodySchem = z.object({
    latitude: z.number().refine(value => {
        return Math.abs(value) <= 90 
    }),
    longitude: z.number().refine(value => {
        return Math.abs(value) <= 180 
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchem.parse(request.body)


    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude, 
        userLongitude: longitude
    })
    
    return reply.status(201).send();
}
