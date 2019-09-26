
import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 

const { User, Advertisement, Merchant } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only('logic - delete ad', () => {
    let name, surname, email, password, userId
    let domain, name_domain, merchant
    let image, title, description, price, date, location, adId
    let token
    
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
        await logic.removeAd(adId)
        const ad = await Advertisement.findById(adId)
        expect(ad).toBeNull()
    })

    it('should fail if the user ad does not exist', async () => {
        try {
            await logic.removeAd( "5d712e297ea98990acdc78bd")
            throw Error('should not arrive here')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`advertisement with id 5d712e297ea98990acdc78bd does not exist`)

        }
    })

    it("should fail on unexisting user" , async () => {
        try{
            await logic.removeAd( "5d712e2v7ea98990acdc78bd", adId )
            const ad = await Advertisement.findById(adId)
            expect(ad).toBeUndefined()
        }catch(error){
            expect(error).toBeDefined()
        }
    })
    
    afterAll(() => database.disconnect())
})

