import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

function Card({ pokemon }) {
    return (
        <div className="card">
            <div className="card-img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="card-name">
                <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
            </div>
            <div className="card-info">
                <div className="card-data card-data-weight">
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="card-data card-data-height">
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="card-data card-data-ability">
                    <p className="title">Abilities</p>
                    <p>{pokemon.abilities.map((pokemonAbility, index, abilities) => {
                        if (abilities.length - 1 === index)
                            return pokemonAbility.ability.name;
                        return pokemonAbility.ability.name + ", "
                    })}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;