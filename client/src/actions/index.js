import axios from 'axios';

export function getDogs(){
    return async dispatch => { 
      const dogs = await axios.get('http://localhost:3001/dogs')// traigo los dogs del back
        return dispatch({
            type: 'GET_DOGS', 
            payload: dogs.data 
        })
    }
}

export function getDogsName(payload){
    return async dispatch => {
        try {
        const dogsName = await axios.get('http://localhost:3001/dogs/?name=' + payload); // me llega el nombre del perro por payload que es lo que el usuario esta buscando en la barra de busqueda
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: dogsName.data 
            })

        }catch(error){
            console.log(error)
        }
    }
}

export function getDogsId(id){
    return async dispatch => {
        let dogsId = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: 'GET_DOGS_ID',
            payload: dogsId.data
        })
    }
}

export function orderName(payload){
    return {
        type: 'ORDER_NAME',
        payload
    }
}

export function orderWeight(payload){
    return{
        type: 'ORDER_WEIGHT',
        payload
    }
}

export function filterDogs(payload){
    return {
        type: 'FILTER_DOGS',
        payload
    }
}

export function filterTemperaments(payload){
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function getTemperaments(){
    return async dispatch => {
        let dogsTemperaments = await axios.get(`http://localhost:3001/temperaments`) // traigo los temperamentos del back
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: dogsTemperaments.data
        })
    }
}


export function postDog(payload){
    return async dispatch => {
        const postDog = await axios.post('http://localhost:3001/dog', payload) // en esta ruta hago un post con el payload que me llega
        console.log(postDog)
        return postDog;
    }
}