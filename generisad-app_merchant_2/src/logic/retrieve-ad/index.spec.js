import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 

const { User, Advertisement, Merchant } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only('logic - retrieve ad', () => {
    let name, surname, email, password, userId
    let domain, name_domain, merchant
    let image, title, description, price, date, location, adId
 
    
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


    })

    it('should succeed on correct data', async () => {
        const ad = await logic.retrieveAd(adId)

            expect(ad).toBeDefined()
            expect(ad.ad.image).toBe(image)
            expect(ad.ad.title).toBe(title)
            expect(ad.ad.description).toBe(description)
            expect(ad.ad.price).toBe(price)
            expect(ad.ad.location).toBe(location)
            expect(ad.ad.merchant_owner.toString()).toBe(merchant)
        
    })

    it('should fail on wrong adId', async() => {
        const wrongAdId = "5d73952803f75b35e0b8d85e"
        try{
            await logic.retrieveAd(wrongAdId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`Advertisement with id 5d73952803f75b35e0b8d85e does not exist.`)
        }
    })

    it('should fail on empty adId', async () => {
        
        try{
            await logic.retrieveAd('')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id is empty or blank`)
        }
    })
    it('should fail on undefined adId', async () => {
        
        try{
            await logic.retrieveAd(undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id with value undefined is not a string`)
        }
    })
    it('should fail on wrong adId data type', async () => {
        
        try{
            await logic.retrieveAd(123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`id with value 123 is not a string`)
        }
    })

    afterAll(() => database.disconnect())
})
