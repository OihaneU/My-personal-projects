const { models: { User, Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Button favorites to add or remove.
 * 
 * 
 * @param {String} userId 
 * @param {String} adId
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or advertisement are not found.
 * 
 * @returns {Promise} message
 */

module.exports = function(userId, adId ) {

    validate.string(userId, 'userId')
    validate.string(adId, 'adId')
   

    return (async () => {
        const ad = await Advertisement.findById(adId).lean()

        if (!ad) throw new Error(`advertisement with id ${adId} does not exist`)

        const user = await User.findById(userId)

        if (!user) throw new Error(`user with id ${userId} is not found `)


        const fav = user.favorites.indexOf(adId)

        if (fav==-1) user.favorites.push(adId)
        else user.favorites.pull(adId)
       
        await user.save()

        return user.favorites
    })()
}