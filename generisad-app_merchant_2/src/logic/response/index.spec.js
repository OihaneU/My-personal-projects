import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 

const { User, Advertisement, Merchant, Mail } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only('logic - response ad', () => {
    let name, surname, email, password, userId
    let domain, name_domain, merchant
    let image, title, description, price, date, location, adId
    let titleMail1,titleMail2, body, body1, mailId
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    beforeEach(async () => { 
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        image = `image-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        price = `price-${random()}`
        date = new Date()
        location = `location-${random()}`

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`
        
        titleMail1 =`titlemessage-${Math.random()}`
        body = `msg-${Math.random()}`

        titleMail2 =`titlemessage-${Math.random()}`
        body1 = `msg-${Math.random()}`

        
        await Mail.deleteMany()
        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant })
        userId = user.id

        const token = jwt.sign({ sub: userId }, REACT_APP_JWT_SECRET_TEST)
        logic.userCredentials = token
        
        
        await Advertisement.deleteMany()
        const ad = await Advertisement.create({ image, title, description, price, location, 'owner': userId, merchant_owner: merchant })
        adId = ad.id


        const mail = await Mail.create({ sender: userId, receiver: userId, date, title:titleMail1, body, advertisement: adId, merchant_owner: merchant })
        mailId = mail.id

    })

    it('should succeed on correct data', async () => { 
        const message = await logic.response(mailId, titleMail2, body1, domain)
        expect(message).toBeUndefined()

    })

    it('should fail on wrong mailId', async() => {
        const wrongMailId = "5d73952803f75b35e0b8d85e"
        try{
            await logic.response(wrongMailId, titleMail2, body1, domain )
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`mailId with id 5d73952803f75b35e0b8d85e not found`)
        }
    })

    it('should fail on empty mailId', async () => {
        
        try{
            await logic.response("", titleMail2, body1, domain)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id is empty or blank`)
        }
    })
    it('should fail on undefined mailId', async () => {
        
        try{
            await logic.response(undefined, titleMail2, body1, domain)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id with value undefined is not a string`)
        }
    })
    it('should fail on wrong mailId data type', async () => {
        
        try{
            await logic.response(123, titleMail2, body1, domain)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id with value 123 is not a string`)
        }
    })

    afterAll(() => database.disconnect())
})
