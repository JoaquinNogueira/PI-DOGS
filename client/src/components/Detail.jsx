import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsId } from "../actions";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams(); // obtengo el id del perro desde la url
  const [dogId] = useState(id); //

  useEffect(() => {
    dispatch(getDogsId(dogId)); // con dispatch llamo a la accion getDogsId y le paso el id
  }, []);

  const dog = useSelector((state) => state.detail); // con useSelector traigo el perro de state.detail
  return (
    <div className="details">
      <Link to="/Home">
        {" "}
        <button className="botton-home">Ir al Home</button>{" "}
      </Link>
      <div className="detail-cont">
        <div>
          {dog[0] ? (
            <div>
              <h1 className="details-name">{dog[0].name}</h1>
              <img
                className="img"
                src={dog[0].image}
                alt={"image not found"}
                width="400px"
                height="400px"
              />
              <div className="detail-temp">
                {dog[0].temperaments &&
                  dog[0].temperaments.map((e) => {
                    if (dog[0].temperaments[0].name) {
                      return <span>{e.name + " "}</span>;
                    } else {
                      return <span>{e + " "}</span>;
                    }
                  })}
              </div>
              <div className="info-detail">
                <ul>
                  <li>Peso minimo: {dog[0].weight_min}</li>
                  <li>Peso maximo: {dog[0].weight_max}</li>
                </ul>
                <ul>
                  <li>Altura minima: {dog[0].height_min}</li>
                  <li>Altura maxima: {dog[0].height_max}</li>
                </ul>
                <ul>
                  <li>Años de vida minimos: {dog[0].years_of_life}</li>
                  <li>Años de vida maximos: {dog[0].years_life_max}</li>
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
    </div>
  );
}
