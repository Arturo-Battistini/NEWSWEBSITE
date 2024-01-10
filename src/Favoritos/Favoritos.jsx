import React from 'react'
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/solid'
import '../index.css'

export const Favoritos = () => {
  const leFavoritos = JSON.parse(localStorage.getItem('leFavoritos')) || []

  return (
    <section className='home favorites'>
      <h2>Mis favoritos</h2>

      <div className='news-container'>
      {leFavoritos.map((favArticle, index) => ( // <-- .map() de el localStorage para su renderización

        <article className='news-article' key={index}>
          <picture>
            <img src={favArticle.image} alt={favArticle.title} />
          </picture>

          <div className='news-content'>
            <h3>
              <a
                href={favArticle.url}
                target='_blank'
                rel='noopener noreferrer'>
                {favArticle.title}
              </a>
            </h3>
            <p>{favArticle.description}</p>

            <div className='news-share'>
              <a
                href={favArticle.url}
                target='_blank'
                rel='noopener noreferrer'>
                <BookmarkIcon />
              </a>
              <a
                href={favArticle.url}
                target='_blank'
                rel='noopener noreferrer'>
                  <ShareIcon />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>

    </section>
  )
}
