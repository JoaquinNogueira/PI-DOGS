import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsName(search)); // con dispatch llamo a la accion getPokemonsName y le paso el valor del input (seteo el estado local)
    setSearch(""); // vuelvo a poner el valor del input vacio
  }
  return (
    <div class="search-box">
      <button className="btn-search" onClick={(e) => handleSubmit(e)}>
        <div class="lupa"></div>
      </button>
      <input
        className="input-search"
        type="ung="
        value={search}
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
