
/**
 * Response an email depending domain, sender and mail.
 * 
 * 
 * @param {String} id 
 * @param {String} title 
 * @param {String} body
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  response is different to 201.
 * 
 */

import logic from '..'

const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id, title, body, domain) {
    validate.string(id, 'id')
    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.string(domain, 'domain')


    const token = logic.userCredentials

    return (async () => {
        
        const response = await fetch(`${REACT_APP_API_URL}/users/message/${id}`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({title, body, domain })
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
