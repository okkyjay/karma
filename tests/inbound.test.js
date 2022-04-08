const request = require('supertest')
const app = require('../server')
jest.setTimeout(100000)


describe('Inbound SMS Test', () => {
    
    it("Should Fail Authentication", async function () {
        return await request(app)
            .post('/api/v1/inbound/sms')
            .set('Accept', 'application/json')
            .set('auth_id', '172938782127127')
            .set('username', 'okeodhsd')
            .expect('Content-Type', /json/)
            .expect(403)
    })

    it("Should Return Inbound Ok", async function () {
        return await request(app)
            .post('/api/v1/inbound/sms')
            .set('Accept', 'application/json')
            .set('auth_id', '20S0KPNOIM')
            .set('username', 'azr1')
            .expect('Content-Type', /json/)
            .expect(403)
    })
})