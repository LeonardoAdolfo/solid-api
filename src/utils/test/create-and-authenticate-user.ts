
import { FastifyInstance } from 'fastify'
import  request  from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
        await request(app.server)
        .post('/users')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const authReposnse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const {token} = authReposnse.body

        return {
            token
        }
}