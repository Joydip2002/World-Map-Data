import { useState } from 'react'
import './components/countrycard/Countrycard.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/pages/Home'
import CountryDetails from './components/pages/CountryDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/country-details/:countryCode' element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
