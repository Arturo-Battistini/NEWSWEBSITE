/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react'

export const MyContext = createContext()

export const Provider = ({ children }) => {
  const [category, setCategory] = useState('general') // <-- Valor de category que recibo del header
  const [favStates, setFavStates] = useState({}) // <-- estado individual de favoritos
  const [favList, setFavList] = useState([]) // <-- lista de favoritos
  const [noticias, setNoticias] = useState([]) // <-- lista entregada por la API
  const [loading, setLoading] = useState(false) // <-- un sencillo loader mientras se espera respuesta

  /* maneno de la api, gestión y asignación de variables */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = '51e373019b00ba26c507a979fe0d38d5'
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?&lang=es&category=${category}&apikey=` + apiKey)
        if (!response.ok) {
          throw new Error(`Error al obtener noticias: ${response.status}`)
        }

        const data = await response.json()
        setNoticias(data.articles)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [category])
  return (
    /* Variables globales */
    <MyContext.Provider value={{
      noticias,
      setNoticias,
      loading,
      setLoading,
      setCategory,
      category,
      favStates,
      setFavStates,
      favList,
      setFavList

    }}>
    {children}
    </MyContext.Provider>
  )
}
/* un pequeño codigo para evitar nombres largos a la hora de importar */
export const UseGlobals = () => {
  const Globals = useContext(MyContext)
  return Globals
}
