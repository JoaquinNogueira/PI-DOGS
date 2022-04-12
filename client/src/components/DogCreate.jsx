import React from 'react';
import {useState, useEffect} from 'react';
import {Link, } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postDog, getTemperaments} from '../actions';

function validate(input) {
    let errors ={};
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    } else if (input.name.length < 3) {
        errors.nameLength = 'El nombre debe tener mas de 3 caracteres';
    } else if (input.weight_min > input.weight_max) {
        errors.weightDif = 'El peso minimo no puede ser mayor al peso maximo';
    } else if (input.weight_min < 0) {
        errors.weightMin = 'El peso minimo no puede ser menor a 0';
    } else if (input.weight_max < 0) {
        errors.weightMax = 'El peso maximo no puede ser menor a 0';
    } else if (input.height_min > input.height_max) {
        errors.heightDif = 'La altura minimo no puede ser mayor a la altura maxima';
    } else if (input.height_min < 0) {
        errors.heightMin = 'La altura minimo no puede ser menor a 0';
    } else if (input.height_max < 0) {
        errors.heightMax = 'La altura maxima no puede ser menor a 0';
    } else if (!input.temperaments) {
        errors.temperaments = 'Se requiere un temperamento';
    }
    return errors;
}

export default function DogCreate(){
    const dispatch = useDispatch(); // ejecuta el dispatch
    const temperaments = useSelector((state) => state.temperaments); // con useSelector traeme todo lo que esta en state.temperaments
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        years_life_min: '',
        years_life_max: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);
        
    function handleChange(e){ // funcion para cambiar el estado de los inputs
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        })
        );
    }

    function handleSelect(e){ // funcion para cambiar el estado de los inputs
        e.preventDefault();
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value], // voy a agregar el valor del input al array de temperament
        });
    }

    function handleSubmit(e){ // funcion para enviar los datos
        e.preventDefault();
        dispatch(postDog(input)); // con dispatch llamo a la accion postDog y le paso el estado de los inputs
        alert('Perro agregado');
        setInput({
            name: '',
            weight_min: '',
            weight_max: '',
            height_min: '',
            height_max: '',
            years_life_min: '',
            years_life_max: '',
            image: '',
            temperaments: [],
        })
    }
    
    return (
        <div>
            <Link to= '/Home'> <button>Ir al Home</button> </Link>
            <h1>Agregar perro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type='text' value={input.name} name= 'name' onChange={(e) => handleChange(e)}/>
                    {errors.name && <p>{errors.name}</p>}
                    {errors.nameLength && <p>{errors.nameLength}</p>}
                </div>
                <div>
                    <label>Weight min: </label>
                    <input type='number' value={input.weight_min} name= 'weight_min' onChange={(e) => handleChange(e)}/>
                    {errors.weightDif && <p>{errors.weightDif}</p>}
                    {errors.weightMin && <p>{errors.weightMin}</p>}
                </div>
                <div>
                    <label>Weight max: </label>
                    <input type='number' value={input.weight_max} name= 'weight_max' onChange={(e) => handleChange(e)}/> 
                    {errors.weightMax && <p>{errors.weightMax}</p>}
                </div>
                <div>
                    <label>Height min: </label>
                    <input type='number' value={input.height_min} name= 'height_min' onChange={(e) => handleChange(e)}/> 
                    {errors.heightDif && <p>{errors.heightDif}</p>}
                    {errors.heightMin && <p>{errors.heightMin}</p>}
                </div>
                <div>
                    <label>Height max: </label>
                    <input type='number' value={input.height_max} name= 'height_max' onChange={(e) => handleChange(e)}/> 
                    {errors.heightMax && <p>{errors.heightMax}</p>}
                </div>
                <div>
                    <label>Years life min: </label>
                    <input type='number' value={input.years_life_min} name= 'years_life_min' onChange={(e) => handleChange(e)}/> 
                </div>
                <div>
                    <label>Years life max: </label>
                    <input type='number' value={input.years_life_max} name= 'years_life_max' onChange={(e) => handleChange(e)}/> 
                </div>
                <div>
                    <label>Image: </label>
                    <input type='url' value={input.image} name= 'image' onChange={(e) => handleChange(e)}/> 
                </div>
                <label>Temperaments: </label>
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
                <ul>{input.temperaments.map(e => e + ' ,')}</ul>
                <button type='submit'>Agregar perro</button>
            </form>
        </div>
    )
}