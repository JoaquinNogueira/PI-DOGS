import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions";
import "./DogCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.name.length < 3) {
    errors.nameLength = "El nombre debe tener mas de 3 caracteres";
  } else if (input.weight_min > input.weight_max) {
    errors.weightDif = "El peso minimo no puede ser mayor al peso maximo";
  } else if (input.weight_min < 0) {
    errors.weightMin = "El peso minimo no puede ser menor a 0";
  } else if (input.weight_max <= 0) {
    errors.weightMax = "El peso maximo no puede ser menor o igual a 0";
  } else if (input.height_min > input.height_max) {
    errors.heightDif = "La altura minimo no puede ser mayor a la altura maxima";
  } else if (input.height_min < 0) {
    errors.heightMin = "La altura minima no puede ser menor a 0";
  } else if (input.height_max <= 0) {
    errors.heightMax = "La altura maxima no puede ser menor o igual a 0";
  } else if (input.years_life_min > input.years_life_max) {
    errors.yearsDif = "La vida minima no puede ser mayor a la vida maxima";
  } else if (input.years_life_min <= 0) {
    errors.yearsMin = "La vida minima no puede ser menor o igual a 0";
  } else if (input.years_life_max <= 0) {
    errors.yearsMax = "La vida maxima no puede ser menor o igual a 0";
  } else if (!input.image) {
    errors.image = "Ingrese el link de una imagen";
  } else if (input.temperament === [""]) {
    errors.temperaments = "Se requiere un temperamento";
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch(); // ejecuta el dispatch
  const temperaments = useSelector((state) => state.temperaments); // con useSelector traeme todo lo que esta en state.temperaments
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    years_life_min: "",
    years_life_max: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
    // funcion para cambiar el estado de los inputs
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    // funcion para cambiar el estado de los inputs
    e.preventDefault();
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value], // voy a agregar el valor del input al array de temperament
    });
  }

  function handleSubmit(e) {
    // funcion para enviar los datos
    e.preventDefault();
    dispatch(postDog(input)); // con dispatch llamo a la accion postDog y le paso el estado de los inputs
    alert("Perro agregado");
    setInput({
      name: "",
      weight_min: "",
      weight_max: "",
      height_min: "",
      height_max: "",
      years_life_min: "",
      years_life_max: "",
      image: "",
      temperaments: [],
    });
  }

  return (
    <div className="create">
      <Link to="/Home">
        <button className="btn-home">Ir al Home</button>
      </Link>
      <div className="bodyCreate">
        <div className="form">
          <div className="subtitle">Agrega un nuevo perro</div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="create-selects">
              <div className="input-container ic1">
                <input
                  name="name"
                  className="input"
                  type="text"
                  placeholder=" "
                  value={input.name}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="name" className="placeholder">
                  Nombre
                </label>
                {errors.name && <p>{errors.name}</p>}
                {errors.nameLength && <p>{errors.nameLength}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="weight_min"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.weight_min}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="weight_min" className="placeholder">
                  Peso minimo
                </label>
                {errors.weightDif && <p>{errors.weightDif}</p>}
                {errors.weightMin && <p>{errors.weightMin}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="weight_max"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.weight_max}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="weight_max" className="placeholder">
                  Peso maximo
                </label>
                {errors.weightMax && <p>{errors.weightMax}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="height_min"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.height_min}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="height_min" className="placeholder">
                  Altura minima
                </label>
                {errors.heightDif && <p>{errors.heightDif}</p>}
                {errors.heightMin && <p>{errors.heightMin}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="height_max"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.height_max}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="height_max" className="placeholder">
                  Altura maxima
                </label>
                {errors.heightMax && <p>{errors.heightMax}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="years_life_min"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.years_life_min}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="years_life_min" className="placeholder">
                  Años de vida minimos
                </label>
                {errors.yearsDif && <p>{errors.yearsDif}</p>}
                {errors.yearsMin && <p>{errors.yearsMin}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="years_life_max"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={input.years_life_max}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="years_life_max" className="placeholder">
                  Años de vida maximos
                </label>
                {errors.yearsMax && <p>{errors.yearsMax}</p>}
              </div>
              <div className="input-container ic2">
                <input
                  name="image"
                  className="input"
                  type="url"
                  placeholder=" "
                  value={input.image}
                  onChange={(e) => handleChange(e)}
                />
                <div className="cut"></div>
                <label htmlFor="image" className="placeholder">
                  Imagen
                </label>
                {errors.image && <p>{errors.image}</p>}
              </div>
              <div className="input-container ic2">
                <select
                  className="create-select"
                  onChange={(e) => handleSelect(e)}
                >
                  {temperaments.map((e) => (
                    <option value={e.name}>{e.name}</option>
                  ))}
                </select>
                <div className="cut"></div>
                {errors.temperament && <p>{errors.temperament}</p>}
                <ul className="temperaments">
                  {input.temperaments.map((e) => e + " ")}
                </ul>
              </div>
            </div>
            <button
              disabled={
                input.temperaments.length === 0 ||
                errors.name ||
                errors.height_min ||
                errors.height_max ||
                errors.weight_min ||
                errors.weight_max ||
                errors.image ||
                errors.years_life_min ||
                errors.years_life_max
              }
              className="submit"
              type="submit"
            >
              Agregar perro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
