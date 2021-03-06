
import retrieveAllAd from '.'
import { database, models } from 'generisad-data'

const { User, Advertisement, Merchant } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

const { random } = Math

describe('logic - retrieve all ads', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id
    let image1, title1, description1, price1, location1, date1, adId1
    let domain, name_domain, merchant

    beforeEach(async () => {
        
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        image1 = `img-${random()}`
        title1 = `TitLe-${random()}`
        description1 = `description-${random()}`
        price1 = `price-${random()}`
        location1 = `location-${random()}`
        date1 = new Date()

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password,  merchant_owner: merchant  })
        id = user.id

        await Advertisement.deleteMany()
        
        const ad1 = await Advertisement.create({ image: image1, title: title1, description: description1, price: price1, location: location1, 'owner': id,  merchant_owner: merchant  })
        adId1 = ad1.id

    })

    it('should succeed on correct data', async () => {
        const ad = await retrieveAllAd(domain)
        
        expect(ad).toBeDefined()
        expect(ad.length).toBeGreaterThanOrEqual(1)
        expect(ad[0]).toBeDefined()
        expect(ad[0].image).toBe(image1)
        expect(ad[0].title).toBe(title1)
        expect(ad[0].description).toBe(description1)
        expect(ad[0].price).toBe(price1)
        expect(ad[0].location).toBe(location1)
        expect(ad[0].merchant_owner.toString()).toBe(merchant)

    })

    afterAll(() => database.disconnect())
})