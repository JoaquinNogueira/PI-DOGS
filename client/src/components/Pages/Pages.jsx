import React from "react";
import './Pages.css'

export default function Pages ({dogsPerPage, allDogs, pages}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) { // con el ciclo for creo la cantidad de paginas dependiendo de la cantidad de perros que hay
        pageNumbers.push(i); // voy agregando los numeros de las paginas
    }

    return (
        <nav>
            <ul className="pages">
                {pageNumbers.map(e => (
                    <div className="number" key={e} href='#'>
                        <button className="botton-page" onClick={() => pages(e)}>{e}</button>
                    </div>
                ))}
            </ul>
        </nav>
    );
        
}