const { models: { User,Mail, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * retrieve user emails depending on domain
 * 
 * 
 * @param {String} userId 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain are not found.
 * 
 * @returns {Promise}
 * @returns {Object} array mails.
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



        const mail = await Mail.find({$or:[{receiver: userId, merchant_owner : merchant_id},{sender:userId, merchant_owner : merchant_id}]}).populate("receiver sender").lean().sort({date: -1})
            if (!mail) throw Error(`There are not message`)
            else {
               
                await Mail.updateMany({receiver: userId}, {$set: { "read" : "true"}} )
                return mail
            }
    })()
}