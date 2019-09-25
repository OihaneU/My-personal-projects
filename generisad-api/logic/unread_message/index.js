const { models: { User,Mail, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * To know if email is new.
 * 
 * 
 * @param {String} userId 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain are not found.
 * 
 * @returns {Promise}
 * @returns {Object} array of emails which are not read.
 */

module.exports = function(userId, domain) {

    validate.string(userId ,"userId")
    validate.string(domain ,"domain")

    return (async () => { 

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const user = await User.findById(userId)
        if (!user) throw Error(`user with id ${userId} not found`)

        const mail = await Mail.find({$and:[{receiver: userId},{read:false},{merchant_owner:merchant_id}]})
            if (!mail) throw Error(`There are not message`)
            else {
               return mail
            }
    })()
}