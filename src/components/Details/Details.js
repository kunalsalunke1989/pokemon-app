import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemon } from '../../services/pokemon';
import './style.css';

function Details() {
    //Set state and state mutator function
    const [pokemonData, setPokemonData] = useState([]);
    //Use useParams to fetch Url parameters
    const params = useParams();
    //Set loading state
    const [loading, setLoading] = useState(true);
    //Set landing page Url
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/' + params.id;

    useEffect(() => {
        async function fetchData() {
            //Get all Pokemon from the endpoint
            let response = await getPokemon(initialUrl);
            //console.log(response);
            setPokemonData([response]);
            setLoading(false);
        }

        fetchData();
    }, [])

    return (
        <div className="App">
            {
                loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
                    <div>
                        <div className="pokemon-details">
                            <div className="card-name">{pokemonData[0].name}</div>
                            <img src={pokemonData[0].sprites.other["official-artwork"].front_default} alt="" />
                        </div>
                        <div className="card-types">
                            {pokemonData[0].types.map(type => {
                                return (
                                    <div className="card-type">
                                        {type.type.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Details;
