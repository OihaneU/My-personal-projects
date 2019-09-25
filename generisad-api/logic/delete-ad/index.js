const { models: { Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
* Delete and advertisement.
 * 
 * 
 * @param {String} userId 
 * @param {String} adId 
 * 
 * @throws {TypeError} - if userId and adId are not a string.
 * @throws {Error} - if user is not found or they are not the owner.
 * 
 * @returns {Promise} message.
 */

module.exports = function(userId, adId) {
    validate.string(userId, 'user id')
    validate.string(adId, 'Advertisement id')
    

    return (async () => {
        const ad = await Advertisement.findById(adId)
            if(!ad) throw new Error(`advertisement with id ${adId} does not exist`)
            else{
                if(ad.owner.toString() !== userId) throw new Error (`user with id ${userId} is not owner of advertisement with id ${adId}`)
                else {
                    const res= await Advertisement.findByIdAndDelete( adId )
                    return res
                }
            }
    })()
}