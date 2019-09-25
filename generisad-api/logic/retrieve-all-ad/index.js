const { models: { Advertisement, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Retrieve all add that exist in a especific domain.
 * 
 * 
 * @param {String} domain
 * 
 * @throws {TypeError} - if domain is not a string.
 * @throws {Error} - if domain is not found.
 * 
 * @returns {Promise} array ads.
 */

 module.exports = function(domain) {

    validate.string(domain, "domain")
    
    return (async () => {
        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const ads = await Advertisement.find( {merchant_owner : merchant_id},{ __v: 0 }).sort({_id:1}).lean() 
        if (!ads) throw Error(`there are not ads`)   
        
        return ads
    })()
}