import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Provider } from './Components/Provider/Provider'
import { Home } from './Home/Home'
import { Header } from './Header/Header'
import { Favoritos } from './Favoritos/Favoritos'

function App () {
  return (
    <>
      <HashRouter>
        <Provider>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favoritos' element={<Favoritos/>}/>
          </Routes>
        </Provider>
      </HashRouter>
    </>
  )
}

export default App
