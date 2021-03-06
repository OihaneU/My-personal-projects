const { models: { Advertisement, User, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Register an advertisement depending on  userId and  domain.
 * 
 * 
 * @param {String} image 
 * @param {String} title 
 * @param {String} description
 * @param {String} price 
 * @param {String} location 
 * @param {String} userId 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain are not found.
 * 
 * @returns {Promise} adId object.
 */

module.exports = function(image, title, description, price, location, userId, domain) {

    validate.string(image, 'image')
    validate.string(title, 'title')
    validate.string(description, 'description') 
    validate.string(price, 'price') 
    validate.string(location, 'location')
    
    validate.string(userId, "userId")
    validate.string(domain, "domain")
    
    const date = new Date()
    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw Error(`user with id ${userId} not found`)

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const ad = await Advertisement.create({image, title, description, price, location, date , owner: userId, merchant_owner: merchant_id})
        return ad.id.toString()
    })()    
}