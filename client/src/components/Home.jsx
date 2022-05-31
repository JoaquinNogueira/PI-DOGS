import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDogs,
  getDogs,
  orderName,
  getTemperaments,
  filterTemperaments,
  orderWeight,
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pages from "./Pages/Pages";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch(); // para usar dispatch
  const allDogs = useSelector((state) => state.dogs); // con useSelector traeme todo lo que esta en state.dogs
  const [order, setOrder] = useState(""); // seteo un estado local que arranca vacio

  // paginado
  const [currentPage, setCurrentPage] = useState(1); // seteo el estado inicial de la pagina
  const [dogsPerPage, setDogsPerPage] = useState(18); // seteo el numero de perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; // calculo el ultimo perro de la pagina
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // calculo el primer perro de la pagina
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // traigo los perros de la pagina actual
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; // funcion para cambiar de pagina

  useEffect(() => {
    // con useEffect hago una funcion que se ejecuta cuando se carga la pagina
    dispatch(getDogs()); // con dispatch llamo a la accion getDogs
  }, [dispatch]); // con [] le digo que no se ejecute nada cuando se cargue la pagina

  function handleClick(e) {
    // con esta funcion hago que al hacer click en el boton, se ejecute la funcion getDogs
    e.preventDefault(); // con esto evito que se recargue la pagina
    setCurrentPage(1);
    dispatch(getDogs());
  }

  function handleOrderName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value)); // con dispatch llamo a la accion orderName y le paso el valor del input
    setCurrentPage(1);
    setOrder(`${e.target.value}`); // seteo el estado de orden que estaba vacio
  }

  function handleOrderWeight(e) {
    e.preventDefault();
    dispatch(orderWeight(e.target.value)); // con dispatch llamo a la accion orderWeight y le paso el valor del input
    setCurrentPage(1);
    setOrder(`${e.target.value}`); // seteo el estado de orden que estaba vacio
  }

  function handleFilterDogs(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterDogs(e.target.value)); // con dispatch llamo a la accion filterDogs y le paso el valor del input
  }

  function handleFilterTemperaments(e) {
    // con esta funcion hago que al hacer click en el boton, se ejecute la funcion filterTypes
    e.preventDefault(); //
    setCurrentPage(1);
    dispatch(filterTemperaments(e.target.value)); // con dispatch llamo a la accion filterTypes y le paso el valor del input
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const temperaments = useSelector((state) => state.temperaments);

  return (
    <div>
      <div className="homecontainer">
        <div className="header">
          <h1 className="title">PERROLANDIA</h1>
          <img
            className="png"
            src="https://e7.pngegg.com/pngimages/385/2/png-clipart-pet-sitting-dog-cat-pet-insurance-puppy-or-kitten-sitting-in-a-row-animals-carnivoran.png"
            alt="logo"
          />
          <Link to="/dogs/">
            <button className="btn-agregar">Agregar nuevo perro</button>
          </Link>
        </div>
        <div className="orderhome">
          <SearchBar />
          <div className="filtros-order">
            <div className="order">
              <select onChange={(e) => handleOrderName(e)}>
                <option value="ascendente">a-z</option>
                <option value="descendente">z-a</option>
              </select>
            </div>
            <div className="order">
              <select onChange={(e) => handleOrderWeight(e)}>
                <option value="peso-ascendente">Menor peso</option>
                <option value="peso-descendente">Mayor peso</option>
              </select>
            </div>
            <div className="order">
              <select onChange={(e) => handleFilterTemperaments(e)}>
                {temperaments.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
            <div className="order">
              <select onChange={(e) => handleFilterDogs(e)}>
                <option value="all">Todos</option>
                <option value="created">Created</option>
                <option value="originales">Originales</option>
              </select>
            </div>
          </div>
          <button
            className="btn-act"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {" "}
            Actualizar{" "}
          </button>
        </div>
        <Pages
          dogsPerPage={dogsPerPage} // le paso el numero de perros por pagina
          allDogs={allDogs.length} // le paso el numero de perros totales
          pages={pages} // le paso la funcion para cambiar de pagina
        />
        <div className="cards">
          {currentDogs?.map((e, id) => {
            return (
              <Link to={"/home/" + e.id} key={id}>
                <div>
                  <Card
                    name={e.name}
                    image={e.image}
                    temperaments={e.temperaments}
                    weight_max={e.weight_max}
                    weight_min={e.weight_min}
                    key={id}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
