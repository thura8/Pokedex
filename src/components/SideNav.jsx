import React from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils'

export default function SideNav() {
  return (
    <nav>

      <div className={"header"}>
        <h1 className='text-gradient'>Pokédex</h1>
      </div>

      <input/>

      {first151Pokemon.map((pokemon,pokemonIndex)=>(
        <button className={'nav-card'}>
          <p>{getFullPokedexNumber(pokemonIndex)}</p>
          <p>{pokemon}</p>
        </button>
      ))}
    </nav>
  )
}