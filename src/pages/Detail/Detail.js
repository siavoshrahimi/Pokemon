import React from 'react';
import { useHistory } from "react-router-dom";
import './Detail.scss';

const Detail = ({location}) => {
    const {name,id,height,abilities,types} = location.state.pokemon;
    const history = useHistory();
    return(
        <div className='wrapper'>
            <div className="container">
                <div className="close">
                    <span onClick={history.goBack}> &times;</span>
                </div>
                <div className='img-wrapper'>
                    <img className='img'
                         src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`}
                         alt={name}
                    />
                </div>
                <div className="title">
                    <h3>{name}</h3>
                </div>
                <div className='detail'>
                    <div className='detail-section'>
                        <strong>ID: </strong>
                        <span>{id}</span>
                    </div>
                    <div className='detail-section'>
                        <strong>Type:</strong>
                        {types.map((obj,i) => <li key={i}>{obj.type.name}</li> )}
                    </div>
                    <div className='detail-section'>
                        <strong>Height: </strong>
                        <span>{height}</span>
                    </div>
                    <div className='detail-section'>
                        <strong>Abilities</strong>
                        {abilities.map((obj,i) => <li key={i}>{obj.ability.name}</li> )}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Detail;