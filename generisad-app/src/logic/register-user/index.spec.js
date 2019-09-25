import registerUser from '.'
import { database, models } from 'generisad-data'

const { random } = Math
const { User, Merchant } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    let name, surname, email, password
    let domain, name_domain, merchant
    
    beforeEach( async ()=>{
        
        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        name= `name-${random()}`
        surname= `surname-${random()}`
        email= `email-${random()}@mail.com`
        password= `password-${random()}`
        
        await User.deleteMany()

    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, email, password, domain)

        expect(response).toBeUndefined()
    })
    afterAll(() => database.disconnect())

})