/**
 * Button favorites to add or remove.
 * 
 * 
 * @param {String} id
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  response is different to 201.
 * 
 */

import logic from '..'
const {validate}= require("generisad-utils") 

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
    validate.string(id, 'id')
    const token = logic.userCredentials
   
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/ads/${id}/favorite`, {
            method: 'post',
            headers: { 'content-type': 'application/json', authorization: `bearer ${token}` },
            body: JSON.stringify({})
        })
        
        if (response.status === 201) {
            const { adId } = await response.json()
            console.log(adId) 

        } else {
            const { error } = await response.json()
            throw new Error(error)
        }

    })()
}

