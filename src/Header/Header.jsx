import React, { useState } from 'react'
import { UseGlobals } from '../Components/Provider/Provider'
import { Bars3Icon, HomeIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
export const Header = () => {
  const globals = UseGlobals()
  const leFavoritos = JSON.parse(localStorage.getItem('leFavoritos')) || []

  const handleCategory = (category) => {
    SetmobileMenu(false)
    globals.setCategory(category)
  }
  const [mobileMenu, SetmobileMenu] = useState(false)
  const handleMobileMenu = () => {
    SetmobileMenu(!mobileMenu)
  }
  return (
    <>
      <header>
        <nav className={`${!mobileMenu ? 'mobile-close' : 'mobile-open'}`}>
          <ul>
            <li>
              <NavLink to='/'>
                <HomeIcon className='home-icon' onClick={() => SetmobileMenu(false)}/>
               </NavLink>
            </li>
            <li onClick={() => handleCategory('general')}> <a> General </a> </li>
            <li onClick={() => handleCategory('business')}> <a> Business </a> </li>
            <li onClick={() => handleCategory('entertainment')}> <a> Entertainment </a> </li>
            <li onClick={() => handleCategory('health')}> <a> Health </a> </li>
            <li onClick={() => handleCategory('nation')}> <a> Nation </a> </li>
            <li onClick={() => handleCategory('sports')}> <a> Sports </a> </li>
            <li onClick={() => handleCategory('science')}> <a> Science </a> </li>
            <li onClick={() => handleCategory('technology')}> <a> Technology </a> </li>
            <li onClick={() => handleCategory('world')}> <a> World </a> </li>
          </ul>
          <NavLink to='/favoritos' className='favoritos'>
            <StarIcon />
            <span>{leFavoritos.length}</span>
          </NavLink>
        </nav>
        {mobileMenu
          ? <XMarkIcon className='mobile-menux' onClick={() => handleMobileMenu()} />
          : <Bars3Icon onClick={() => handleMobileMenu()} className='mobile-menu'/>}
      </header>
    </>
  )
}
