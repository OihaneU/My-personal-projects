import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter, Link, Route, Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Nav from "../Nav"
import Footer from "../Footer"

function RetrieveAd ({ history }) {
    const [myAds, setMyAds] = useState()

    


    async function handleDelete(i) {
        if (!logic.isUserLoggedIn()) {
            history.push('/auth')
        } else {
            try {
                await logic.removeAd(i)
                let domain = window.location.hostname
                const _ads = await logic.retrieveMyAds(domain)
                setMyAds(_ads)

            } catch (error) {
                console.log(error.message)
            }
        }
    }


    useEffect(() => {
        (async () => {
            try{
                let domain = window.location.hostname
                const _ads = await logic.retrieveMyAds(domain)
                
                setMyAds(_ads)
            }catch(error){
                console.log(error.message)
            }
         
        })()
    }, [])

    return <>
    
        <Nav/>

        <section className="myads">

            <h2 className="myads__ini">Mis publicaciones</h2>
                <ul className="myads__ul" >
                   
                    {myAds && myAds.length && myAds.map(item => <li className="myads__li" key={item._id}>
                            <img className="myads__image" src={item.image}></img>
                            <div className="myads__text">
                                <h2 className="myads__title">{item.title}</h2>
                                <p className="myads__description">{item.description}</p>
                                <p className="myads__price">{item.price}</p>
                                <p className="myads__location">{item.location}</p>  
                                <button className="myads__button" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt} color="gray"/></button>
                            </div>
                                            
                    </li>)||<li className="myads__none">No tienes ninguno anuncio todavía</li>}
                </ul>
        </section>
        
    <Footer/>
    </>
}
export default withRouter(RetrieveAd)