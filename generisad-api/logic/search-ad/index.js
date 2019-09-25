const { models: { Advertisement, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Search according to a query.
 * 
 * 
 * @param {String} query 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if domain or query are not found.
 * 
 * @returns {Promise} array of advertisement.
*/

module.exports = function(query, domain) {


    
    validate.string(query, 'query')
    validate.string(domain ,"domain")

    return (async () => {


        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id
        const ads = await Advertisement.find( {"title": { "$regex": `${query}`, "$options": "i" }, merchant_owner:merchant_id},{ __v: 0 }).sort({_id:1}).lean()
        if (!ads) throw Error(`there are not ads with query ${query}`)   
      
        
        return ads
    })()
}