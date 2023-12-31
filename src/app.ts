/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply)=>{
    if(error instanceof ZodError){
        return reply.status(400).send({message: "Valitadion error", issues: error.format()})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error) 
    } else{
        // TODO: Here we should add an ezternal tool like DataLog
    }

    return reply.status(500).send({message: "Intenal server error"})
})
