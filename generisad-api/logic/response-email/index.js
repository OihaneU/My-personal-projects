const { models: { User, Mail, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Response an email depending domain, sender and mail.
 * 
 * 
 * @param {String} userId 
 * @param {String} mailId 
 * @param {String} title 
 * @param {String} body
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain or mail are not found.
 * 
 * @returns {Promise} mailId object.
 */

 module.exports = function(userId, mailId, title, body, domain ) {

    validate.string(userId, "userId")
    validate.string(mailId, "mailI")
    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.string(domain, 'domain')
    
    const date = new Date()


    return (async () => {

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const user = await User.findById(userId)
            if(!user) throw Error(`userId with id ${userId} not found`)

        const mail = await Mail.findById(mailId)
            if(!mail) throw Error(`mailId with id ${mailId} not found`)
            else {
                receiverId= mail.sender
                advertisement = mail.advertisement
            }
               

       const conversation = await Mail.create({sender: userId, receiver: receiverId, title, body, advertisement, date,  merchant_owner : merchant_id })
       
       return conversation.id
    })()    
}

// //schema Mail add destinatario y titulo