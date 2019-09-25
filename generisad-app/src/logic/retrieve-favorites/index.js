/**
 * Retrieve users fav depending on the domain.
 * 
 * 
 * @param {String} domain
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if response is different to 200.
 * 
 */

import logic from '..'

const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (domain) {

        validate.string(domain, 'domain')

        const token = logic.userCredentials
        
        return (async () => { 
                const response = await fetch(`${REACT_APP_API_URL}/users/favorites/${domain}`, {
                        method: 'get',
                        headers: {authorization: `bearer ${token}`}
                })

                if (response.status !== 200) {
                        const { error } = await response.json()
        
                        throw Error(error)
                }
                   
                const res = await response.json()

                return res.ad
        })()       
}