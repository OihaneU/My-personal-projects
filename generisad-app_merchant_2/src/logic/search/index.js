/**
 * Search according to a query.
 * 
 * 
 * @param {String} query 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if response is different to 200.
 * 
 * @returns {Promise} array of advertisement.
*/


const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (query, domain)  {
    validate.string(query, 'query')
    validate.string(domain, 'domain')

    return(async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/search/?query=${query}&domain=${domain}`, {
            method: 'get',
            headers: { 'content-type': 'application/json'}, 
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        const ads = await response.json()
        return ads.ad
    })()
}
