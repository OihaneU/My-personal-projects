/**
 * Register an advertisement depending on  userId and  domain.
 * 
 * 
 * @param {String} image 
 * @param {String} title 
 * @param {String} description
 * @param {String} price 
 * @param {String} location 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  response is different to 201.
 * 
 */

import logic from '..'
const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ({name}, title, description, price, location, domain) {
    validate.string(name, 'name')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(price, 'price')
    validate.string(location, 'location')
    validate.string(domain, 'domain')
    
    const token = logic.userCredentials
    const image = name

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/ads`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({image , title, description, price, location, domain })
        })
        
        if (response.status === 201) {
            const { adId } = await response.json()
            return adId

        } else {
            const { error } = await response.json()
            throw new Error(error)
        }

    })()
}

