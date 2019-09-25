const { models: { Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * Retrieve one  advertisement/detail.
 * 
 * 
 * @param {String} adId 
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  user or domain or mail are not found.
 * 
 * @returns {Promise} advertisement
 */

module.exports = function(adId) {
    
    validate.string(adId, "ad id")

    

    return (async () => {
        const ad = await Advertisement.findById(adId)
            if (!ad) throw Error(`Advertisement with id ${adId} does not exist.`)
            else {
                ad.id = adId
                return ad
            }
    })()
}