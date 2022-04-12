import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getDogsName } from '../actions';
import './SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

function handleInputChange(e){
    e.preventDefault();
    setSearch(e.target.value);
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getDogsName(search)); // con dispatch llamo a la accion getPokemonsName y le paso el valor del input (seteo el estado local)
    setSearch(''); // vuelvo a poner el valor del input vacio
}
    return (
        <div>
            <input className='input' type='text' value={search} placeholder='Buscar por nombre...' onChange = {(e) => handleInputChange(e)}/>
            <button className='btn-search' type='submit' onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    )
}