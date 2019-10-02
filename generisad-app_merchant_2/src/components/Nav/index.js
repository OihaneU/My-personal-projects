
import React, { useState, useEffect } from 'react'
import logic from '../../logic'

import { withRouter } from 'react-router-dom'


function Nav ({ history}) {
    const [read, setRead] = useState()

    let domain = window.location.hostname

    function handleLogout ()  {
        logic.logoutUser()
        history.push("/")
    }

    function handleHome (event)  {
        event.preventDefault()
        history.push("/")
    }

    function handleRead ()  {
        logic.unreadMessage(domain)
        history.push("/message")
        setRead(0)
    }

    
    const token = logic.userCredentials

    useEffect(() => {
        (async () => {
            try{
                const _mails = await logic.unreadMessage(domain)
                
                _mails ? setRead(_mails.length) : setRead(0)
            
            }catch(error){
                console.log(error.message)
            }
         
        })()
    }, [])

    return <>
       <nav class="nav">   
        <div class="nav__menuToggle"> 
            <input type="checkbox" />
                <span className="span"></span>
                <span className="span"></span>
                <span className="span"></span>

                {!token ?
                   <ul class="nav__menu">
                        <a class= "menu-nav__list" href={`/#/ad`}><li>Busca un anuncio</li></a>
                        <a class= "menu-nav__list"  href={`/#/publish`}><li>Publica tu anuncio</li></a>
                        <hr/>
                        <a class= "menu-nav__list" href="/#/register"><li>Regístrate</li></a>
                        <a class= "menu-nav__list" href={`/#/auth`}><li>Accede</li></a> 
                  </ul> :
                

                    <ul class="nav__menu">
                        <a class= "menu-nav__list" href={`/#/ad`}><li>Busca un anuncio</li></a>
                        <a class= "menu-nav__list"  href={`/#/publish`}><li>Publica tu anuncio</li></a>
                        <hr/>
                        <a class= "menu-nav__list" href={`/#/favorites`}><li>Mis favoritos</li></a>
                        <a class= "menu-nav__list"  href={`/#/myads`}><li>Ver mis anuncios</li></a>
                        <hr/>
                        {!read ?
                            <a class= "menu-nav__list" href={`/#/message`}><li>Mensajes</li></a>
                            :
                            <a class= "menu-nav__list" href={`/#/message`} onClick={() => handleRead()}><li>Mensajes (Nuevos {read})</li></a>
                        }
                        
                        
                        <a class= "menu-nav__list"  href={`/#/`} onClick={() => handleLogout()}><li>Logout</li></a> 
                  </ul>

                }
              
        </div>         
        <img className="logo" onClick={handleHome} src={require('../../img/logo.png')} alt="img_00.jpg"></img>
    </nav>


    </>
}

export default withRouter(Nav)