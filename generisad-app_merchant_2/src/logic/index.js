import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import publish from './publish'
import upload from "./upload"
import search from "./search"
import retrieveAd from "./retrieve-ad"
import retrieveMessage from "./retrieve-message"
import detail from "./detail"
import sendEmail from "./send-email"

import unreadMessage from "./unread-message"
import favorite from "./favorite"
import retrieveFavorites from "./retrieve-favorites"
import response from "./response"

import retrieveMyAds from "./retrieve-my-ads"
import removeAd from "./delete-ad"
import retrieveAllAd from "./retrieve-all-ad"

import translateMessage from './translate-error'


export default {
    set userCredentials(token){
        sessionStorage.token = token
    },

    get userCredentials(){
        return sessionStorage.token 
    },

    set userEmail(email){
        sessionStorage.email = email
    },

    get userEmail(){
        return sessionStorage.email 
    },

    isUserLoggedIn(){
        return !!this.userCredentials
    },

    logoutUser() {
        sessionStorage.clear()
    },
    
    registerUser,
    authenticateUser,
    search,
    retrieveAd,
    publish,
    upload,
    retrieveMessage,
    detail,
    sendEmail, 
    favorite,
    retrieveFavorites, 
    response,
    retrieveMyAds,
    removeAd,
    translateMessage,
    unreadMessage, 
    retrieveAllAd
}
