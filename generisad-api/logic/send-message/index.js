const { models: { Advertisement, User, Mail, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Send an email depending domain, adId and user.
 * 
 * 
 * @param {String} userId 
 * @param {String} adId 
 * @param {String} title 
 * @param {String} body
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain or advertisement are not found.
 * 
 * @returns {Promise} mailId object.
 */

 module.exports = function(userId, adId,title, body, domain ) {

    validate.string(userId, "userId")
    validate.string(adId, "adId")
    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.string(domain, 'domain')
        
    const date = new Date()

    return (async () => { 

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const user = await User.findById(userId)
            if(!user) throw Error(`user with id ${userId} not found`)

        const ad = await Advertisement.findById(adId)
            if(!ad) throw Error(`ad with id ${adId} not found`)
            else receiverId = ad.owner
            

       const mail = await Mail.create({sender: userId, receiver: receiverId, title, body, ad: adId, date, advertisement : ad,  merchant_owner : merchant_id })
       
       return mail.id
    })()    
}
