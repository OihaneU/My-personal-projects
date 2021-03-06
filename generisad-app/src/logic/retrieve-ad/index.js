/**
 * Retrieve one  advertisement/detail.
 * 
 * 
 * @param {String} id 
 * 
 * @throws {TypeError} - if any of the parameters are not a string.
 * @throws {Error} - if  response different to 200.
 * 
 */

const {validate}= require("generisad-utils")

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id) {
        validate.string(id, 'id')

        return (async () => { 
                const response = await fetch(`${REACT_APP_API_URL}/product/${id}`, {
                        method: 'get',
                        headers: {}
                })

                if (response.status !== 200) {
                        const { error } = await response.json()

                        throw Error(error)
                }else{
                        const ad = await response.json()

                        return ad
                }

        })()    
}