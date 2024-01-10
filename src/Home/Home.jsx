import React, { useEffect, useState } from 'react'
import { UseGlobals } from '../Components/Provider/Provider'
import { BookmarkIcon, ShareIcon, StarIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

export const Home = () => {
  const globals = UseGlobals()
  const leFavoritos = JSON.parse(localStorage.getItem('leFavoritos')) || []
  const [searchTerm, setSearchTerm] = useState('') // recibe el input de busqueda

  /* Manejo de la estrella (icono) de favoritos y la interacción con el cliente */
  const handleIsFavActive = (index, article) => {
    const newFavStates = { ...globals.favStates }
    newFavStates[index] = !newFavStates[index]
    globals.setFavStates(newFavStates)
    globals.setFavList([...globals.favList, article])

    /* obtengo y guardo la lista de favoritos en localStorage */
    const articleExists = leFavoritos.some((favArticle) => favArticle.title === article.title)

    if (!articleExists) {
      leFavoritos.push(article)
      localStorage.setItem('leFavoritos', JSON.stringify(leFavoritos))
    } else {
      alert('El artículo ya está en favoritos')
    }
  }

  useEffect(() => {
    const initialFavStates = {}
    globals.noticias.forEach((_, index) => {
      initialFavStates[index] = false
    })
    globals.setFavStates(initialFavStates)
  }, [globals.noticias])

  /* Filtro por titulo */
  const filteredNoticias = globals.noticias.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /* Compartir noticias  */
  const handleShare = async (objeto) => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: objeto.url,
          title: objeto.title
        })
      } else {
        alert('Tu navegador no soporta la función de compartir.')
      }
    } catch (error) {
      console.error('Error al intentar compartir:', error)
    }
  }

  return (
    <section className='home'>
      <h1>Las noticias más relevantes del día</h1>

      <NavLink to='/favoritos' className='home-star_icon'>
            <StarIcon />
            <span>{leFavoritos.length}</span>
          </NavLink>

      {/* input de busqueda */}
      <div className='search-news_container'>
        <label htmlFor='searchInput'>Buscar por título: </label>
        <input
          type='text'
          id='searchInput'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Escribe aquí...'
        />
      </div>
      {/* Condicional de la respuesta de la api */}
      {globals.loading
        ? <p>Cargando noticias...</p>

        : <div className='news-container'>
            {filteredNoticias.map((article, index) => ( // <-- .map() para obtener cada dato de la api para hacer el render y maquetación

              <article className='news-article' key={index}>
                <picture>
                  <img src={article.image} alt={article.title} />
                </picture>

                <div className='news-content'>
                  <h3>
                    <a
                      href={article.url}
                      target='_blank'
                      rel='noopener noreferrer'>
                      {article.title}
                    </a>
                  </h3>
                  <p>{article.description}</p>

                  <div className='news-share'>
                    <a
                      href={article.url}
                      target='_blank'
                      rel='noopener noreferrer'>
                        <BookmarkIcon className='share-icon' title='Ver fuente' />
                    </a>
                    <a onClick={() => handleShare(article)} target='_blank' rel='noopener noreferrer'>
                      <ShareIcon className='share-icon' title='Compartir' />
                    </a>
                    <a onClick={() => handleIsFavActive(index, article)}>
                      <StarIcon title='Guardar en favoritos' className={'yellow-star'} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          }
    </section>
  )
}
