
/**
 * Retrieve all add that exist in a especific domain.
 * 
 * 
 * @param {String} domain
 * 
 * @throws {TypeError} - if domain is not a string.
 * @throws {Error} - if response is different to 200.
 * 
 */

const {validate}= require("generisad-utils")
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (domain) {

        validate.string(domain, 'domain')

        return (async () => { 
                const response = await fetch(`${REACT_APP_API_URL}/products/${domain}`)

                if (response.status !== 200) {
                        const { error } = await response.json()
        
                        throw Error(error)
                }
                   
                const res = await response.json()

                return res.ad 
        
        })()      
}