import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogsId } from '../actions';

export default function Detail(){
    const dispatch = useDispatch();
    const { id } = useParams(); // obtengo el id del perro desde la url
    const [dogId] = useState(id); // 

    useEffect (() => {
        dispatch(getDogsId(dogId)); // con dispatch llamo a la accion getDogsId y le paso el id
    }, []);
    
    
    const dog = useSelector ((state) => state.detail) // con useSelector traigo el perro de state.detail
    console.log(dog)
    return (
        <div>
          <Link to= '/Home'> <button>Ir al Home</button> </Link>
          <div>
          { dog[0] ?(
            <div>
            <h1>{dog[0].name}</h1>
            <h2>ID: {dog[0].id}</h2>
            <img src={dog[0].image} alt={'image not found'} width='400px' height='400px'/>
            <div> 
              { dog[0].temperaments && dog[0].temperaments.map(e => {
              if(dog[0].temperaments[0].name) {
                return (
                  <h4>{e.name}</h4>
                )
              } else {
                return (
                  <h4>{e}</h4>
                )
              }
              })}
            </div>
            <p>WEIGTH MIN: {dog[0].weight_min}</p>
            <p>WEIGTH MAX: {dog[0].weight_max}</p>
            <p>HEIGTH MIN: {dog[0].height_min}</p>
            <p>HEIGTH MAX: {dog[0].height_max}</p>
            <p>YEARS LIFE MIN: {dog[0].years_life_min}</p>
            <p>YEARS LIFE MAX: {dog[0].years_life_max}</p>
            </div>
            ):( <p>Loading..</p> )}
            </div>
        </div>
    )
}