/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 90 
    }),
    longitude: z.coerce.number().refine(value => {
        return Math.abs(value) <= 180 
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)


    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const gyms = await fetchNearbyGymsUseCase.execute({ 
        userLatidude: latitude, 
        userLongitude: longitude
    })
    
    return reply.status(200).send({
        gyms
    });
}
