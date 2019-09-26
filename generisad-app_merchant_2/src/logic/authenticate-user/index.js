/**
 * Authenticate  a user by the email and by domain.
 * 
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {String} domain
 * 
 * @throws {TypeError} - if email, password or domain are not a string.
 * @throws {Error} - if response is different to 200.
 * 
*/


const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (email, password, domain) {
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(domain, 'domain')

    return (async () => { 
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password, domain })
        })

        if (response.status === 200) {
            const { token } = await response.json()

            this.userCredentials = token
            this.userEmail =email
        
        }else{
            const { error } = await response.json()
            throw new Error (error)
        }

    })()
}