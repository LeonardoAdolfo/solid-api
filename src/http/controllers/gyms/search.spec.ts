import request from "supertest"
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe('Seach a Gym (e2e)',()=>{
    beforeAll(async ()=>{
        await app.ready()
    })
    afterAll(async ()=>{
        await app.close()
    })
    it('should be able search a gym', async ()=> {
        
        const {token} = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
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
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        const response = await request(app.server)
        .get('/gyms/search')
        .query({
            q: 'JavScript'
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        // console.log(response.body.gyms)
        // expect(response.body.gyms).toHaveLength(1)
        // expect(response.body.gyms[0].title).toEqual([
        //     expect.objectContaining({
        //         title: 'JavScript Gym'
        //     })
        // ])
        
    })
})