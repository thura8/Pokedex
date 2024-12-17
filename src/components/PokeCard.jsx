import React, { useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils'
import TypeCard from './TypeCard'

export default function PokeCard({selectedPokemon}) {

  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)

  const {name,height,abilities,stats,types,moves,sprites} = data || {}

  useEffect(() => {
    
    if (loading || !localStorage) return
    
    let cache = {}
    if (localStorage.getItem('pokedex')) {
        cache = JSON.parse(localStorage.getItem('pokedex'))
    }

    if (selectedPokemon in cache) {
        
        setData(cache[selectedPokemon])
        console.log('Found pokemon in cache')
        return
    }

    async function fetchPokemonData() {
        setLoading(true)

        try {
            
          const baseUrl = 'https://pokeapi.co/api/v2/'
          const finalUrl = `${baseUrl}pokemon/${getPokedexNumber(selectedPokemon)}`
          const res = await fetch(finalUrl)
          const pokemonData = await res.json()
          setData(pokemonData)

          console.log('Fetched pokemon data')

          cache[selectedPokemon] = pokemonData
           
          localStorage.setItem('pokedex', JSON.stringify(cache))

        } catch (err) {

            console.log(err.message)

        } finally {

            setLoading(false)
        }
    }

    fetchPokemonData()

    
}, [selectedPokemon])

if(loading || !data){
  return(
    <div>

      <h4>Loading ...</h4>

    </div>
  )
}

  return (
    <div className="poke-card">

      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>

      <div className="type-container">
        {types.map((typeObj,typeIndex)=>(
          <TypeCard key={typeIndex} type={typeObj?.type?.name} />
        ))}
      </div>

    </div>
  )
}
