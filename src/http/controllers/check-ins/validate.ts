/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParmsSchema = z.object({
        checkInId: z.string().uuid()
    })

  const { checkInId } = validateCheckInParmsSchema.parse(request.params)

    const validateCheckInnUseCase = makeValidateCheckInUseCase()

    await validateCheckInnUseCase.execute({
        checkInId
    })
    
    return reply.status(204).send();
}
