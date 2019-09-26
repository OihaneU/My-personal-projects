/**
 * Retrieve user.
 * 
 * 
 * @param {String} token 
 * 
 * @throws {TypeError} - if token is not a string.
 * @throws {Error} - if  response is different to 200.
 * 
 * @returns {Promise}
*/

const {validate}= require("generisad-utils")
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (token) {
    validate.string(token, 'token') 

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'get',
            headers: {
                authorization: `bearer ${token}`
            }
        })

        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }

        const { user } = await response.json()
        return user
     })()
}