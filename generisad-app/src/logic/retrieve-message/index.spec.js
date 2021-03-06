import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 

const { User, Advertisement, Merchant, Mail } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only('logic - retrieve mails', () => {
    let name, surname, email, password, userId
    let domain, name_domain, merchant
    let image, title, description, price, date, location, adId
    let titleMail1, body, mailId
    
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
        const result = await logic.retrieveMessage(domain)
            expect(result).toBeDefined()
            expect(result).toHaveLength(1)
    })

    it('should fail on wrong domain', async() => {
        const wrong = "5d73952803f75b35e0b8d85e"
        try{
            await logic.retrieveMessage(wrong )
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`domain 5d73952803f75b35e0b8d85e not found`)
        }
    })

    it('should fail on empty domain', async () => {
        
        try{
            await logic.retrieveMessage("")
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`domain is empty or blank`)
        }
    })
    it('should fail on undefined domain', async () => {
        
        try{
            await logic.retrieveMessage(undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`domain with value undefined is not a string`)
        }
    })
    it('should fail on wrong domain data type', async () => {
        
        try{
            await logic.retrieveMessage(123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`domain with value 123 is not a string`)
        }
    })

    afterAll(() => database.disconnect())
})

