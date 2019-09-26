import React, { useState, useEffect } from 'react'
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import Search from '../Search'
import Landing from '../Landing'
import Results from '../Results'
import queryString from 'query-string'
import Detail from '../Detail'
import Publish from '../Publish'
import Message from '../Message'
import Favorites from '../Favorites'
import SendEmail from '../SendEmail'
import Response from "../Response"
import RetrieveAd from "../RetrieveAd"



import { withRouter, Route } from 'react-router-dom'




function App({history}) {


  const [query, setQuery] = useState()
  

  
    function handleSearch(query) {
        setQuery(query)

        history.push(`/search?query=${query}`)
      }

      useEffect(() => {
        const { q: query } = queryString.parse(history.location.search)

        setQuery(query)
      }, [])




  return (
    <div className="App">
        <Route exact path="/" render={() => <Landing/>} />
        <Route path="/ad" render={() => <Search onSearch={handleSearch} />} /> 
        <Route path="/search" render={() => <Results query={query} />} />
        <Route path="/ads/:id" render={history => <Detail id={history.match.params.id} />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/auth" render={() => <Login />} />
        <Route path='/publish' render={() => <Publish/> } /> 
        <Route path='/message' render={() => <Message /> } /> 
        <Route path='/favorites' render={() => <Favorites/> } /> 
        <Route path='/send/:id' render={history => <SendEmail id={history.match.params.id} /> } /> 
        <Route path='/response/:id' render={() => <Response /> } /> 
        <Route path='/myads' render={() => <RetrieveAd /> } /> 
    </div>
  );
}

export default withRouter(App);
