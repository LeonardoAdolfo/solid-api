import request from "supertest"
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe('Create Gym (e2e)',()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })
    it('should be able create gym', async ()=> {
        
        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server)
        .get('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title:'JavScript Gym',
            description: 'Some description.',
            phone: '12121323',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        expect(response.statusCode).toEqual(201)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                email:'johndoe@example.com'
            })
        )
    })
})