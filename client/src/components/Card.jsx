import React from 'react';
import './Card.css';

export default function Card({name, image, temperaments, weight_min, weight_max, id}) {
    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name} width='300px' height='200px'/>
            {console.log(temperaments)};
            <div> 
              { temperaments && temperaments.map(e => {
              if(temperaments[0].name) {
                return (
                  <h4 key={id}>{e.name}</h4>
                )
              } else {
                return (
                  <h4>{e}</h4>
                )
              }
              })}
            </div>
            <h5>Pesos (kg)</h5>
        <div>
          <div>
            <p>Peso mínimo</p>
            <span>{weight_min}</span>
          </div>
          <div>
            <p>Peso máximo</p>
            <span>{weight_max}</span>
          </div>
        </div>
        </div>
    );
}