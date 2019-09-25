/**
 * upload image.
 * 
 * @param {String} adId 
 * @param {String} image 
 * 
 * @throws {Error} - if response is different to 200.
 * 
*/

import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (adId, image) {
    
    const token = logic.userCredentials

    var formData = new FormData();
    formData.append('image', image);

    return (async () => {

        const response = await fetch(`${REACT_APP_API_URL}/users/ads/${adId}/upload`, {
            method: 'post',
            headers: { authorization: `bearer ${token}` },
            body: formData
        })
        
        if (response.status === 200) {
            const { message } = await response.json()
        
        } else {
            const { error } = await response.json()
            throw new Error(error)
        }

    })()
}