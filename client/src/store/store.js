import {createStore, applyMiddleware} from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension'; // agrega el middleware de redux-devtools-extension
import thunk from 'redux-thunk'; // agrega el middleware de redux-thunk
import rootReducer from '../reducer/reducer'; // traigo el reducer

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // creo el store con el reducer y el middleware