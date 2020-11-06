import React from 'react';
import {Link} from "react-router-dom";
import './Card.scss'

const Card = ({pokemon}) => (
    <div className="card-wrapper">
        <Link to={{pathname:`/detail/${pokemon.name}`,state:{pokemon}}}>
            <div className='card-img'>
                <img
                    className='img'
                    src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
                    alt={pokemon.name}/>
            </div>
            <div className="card-title">
                <p>{pokemon.name}</p>
            </div>
        </Link>
    </div>
)

export default Card;