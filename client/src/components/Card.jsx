import React from "react";
import "./Card.css";

export default function Card({
  name,
  image,
  temperaments,
  weight_min,
  weight_max,
  id,
}) {
  return (
    <div className="card-cont">
      <h1 className="card-tit">{name}</h1>
      <img
        className="card-img"
        src={image}
        alt={name}
        width="220px"
        height="200px"
      />
      <h5 className="tit-temp">Temperamentos</h5>
      {console.log(temperaments)}
      <div className="card-temp">
        {temperaments &&
          temperaments.map((e) => {
            if (temperaments[0].name) {
              return (
                <span className="temp" key={id}>
                  {e.name + ", "}
                </span>
              );
            } else {
              return (
                <span className="temp" key={id}>
                  {e + ", "}
                </span>
              );
            }
          })}
      </div>
      <h5 className="tit-weight">Peso (kg)</h5>
      <div>
        <div>
          <span className="weight">Peso mínimo: {weight_min}</span>
        </div>
        <div>
          <span className="weight">Peso máximo: {weight_max}</span>
        </div>
      </div>
    </div>
  );
}
