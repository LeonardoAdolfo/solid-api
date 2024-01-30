import request from "supertest"
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe('Search Nearby Gym (e2e)',()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })
    it('should be able seach nearby gym', async ()=> {
        
        const {token} = await createAndAuthenticateUser(app)

        // await gymsRepository.create({
        //     title: 'Near Gyms',
        //     description: null,
        //     phone: null,
        //     latitude: -27.2092052,
        //     longitude: -49.6401091
            
        // })
    
        // await gymsRepository.create({
        //     title: 'Far Gyms',
        //     description: null,
        //     phone: null,
        //     latitude: -27.0610928,
        //     longitude: -49.5229501
        // })

        await request(app.server)
        .post('/gyms/nearby')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title:'JavScript Gym',
            description: 'Some description.',
            phone: '12121323',
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title:'TypevScript Gym',
            description: 'Some description.',
            phone: '12121323',
            latitude: -27.0610928,
            longitude: -49.5229501
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -27.0610928,
            longitude: -49.5229501
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        
    })
})