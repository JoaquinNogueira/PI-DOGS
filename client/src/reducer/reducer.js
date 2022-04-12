const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    temperaments: [],
} // estado inicial de las razas

function rootReducer(state = initialState, action) {
    switch(action.type){
        
        case 'GET_DOGS': // si la accion es GET_DOGS 
            return {
                ...state, // devuelvo el estado actual
                dogs: action.payload, // agrego lo que mande la accion GET_DOGS
                allDogs: action.payload // agrego lo que mande la accion GET_DOGS
            }
        
        case 'GET_NAME_DOGS': // si la accion es GET_NAME_DOGS
            return{
                ...state,
                dogs: action.payload
        }

        case 'GET_DOGS_ID': // si la accion es GET_DOGS_ID
                return{
                    ...state, // devuelvo el estado actual
                    detail: action.payload // agrego lo que mande la accion GET_DOGS_ID
                }
    
        case 'ORDER_NAME': // si la accion es ORDER_NAME
        const allDogs = state.allDogs
        const orderName = action.payload === 'ascendente' ? allDogs.sort((a,b) => a.name.localeCompare(b.name)) : allDogs.sort((a,b) => b.name.localeCompare(a.name)) // si el payload es ascendente, ordeno los perros por nombre ascendente, sino ordeno los perros por nombre descendente
            return {
                ...state,
                dogs: orderName // agrego lo que mande la accion ORDER_NAME
            }

        case 'ORDER_WEIGHT': // si la accion es ORDER_WEIGHT
        const allDogs2 = state.allDogs
        const orderWeight = action.payload === 'peso-ascendente' ? allDogs2.sort((a,b) => ((a.weight_max + a.weight_min)/2 ) - (b.weight_max + b.weight_min)/2 ) : allDogs2.sort((a,b) =>(b.weight_max + b.weight_min)/2 - ((a.weight_max + a.weight_min)/2 )) // si action.payload es Attack-ascendente, ordeno los pokemons por ataque ascendente, sino ordeno los pokemons por ataque descendente
            console.log(orderWeight)
        return {
                ...state,
                dogs: orderWeight // agrego lo que mande la accion ORDER_ATTACK
            }

        
        case 'FILTER_DOGS': // si la accion es ORDER_DOGS
        const allDogs3 = state.allDogs
        const filteredDogs = action.payload === 'created' ? allDogs3.filter(e => e.creatInDB) : allDogs3.filter(e => !e.creatInDB) // si el payload es created, devuelvo los perros que se crearon en la base de datos, sino devuelvo los perros que no se crearon en la base de datos
            return {
                    ...state, 
                    dogs: filteredDogs // agrego lo que mande la accion FILTER_DOGS
                }
    
   
        case 'FILTER_BY_TEMPERAMENT': // si la accion es FILTER_BY_TEMPERAMENT
        const allDogs4 = state.allDogs
        const filteredDogsTypes = action.payload === 'all' ? allDogs4 : allDogs4.filter(e => e.temperaments.includes(action.payload)) // si el payload es All, devuelvo todos los perros, sino filtro los perros que tengan el tipo que mande la accion
                return {
                    ...state, // devuelvo el estado actual
                    dogs: filteredDogsTypes
                } 

        case 'GET_TEMPERAMENTS': // si la accion es GET_TEMPERAMENTS
            return {
                ...state,
                temperaments: action.payload
            }

        case 'POST_POKEMON': // si la accion es POST_POKEMON
            return{
                ...state,
            }
    
        default:
            return state;
    }
}
export default rootReducer;
        
