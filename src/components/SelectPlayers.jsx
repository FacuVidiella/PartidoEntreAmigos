import React, { useState, Suspense } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function SelectPlayers({ getNames }) {
  let [playerName, setPlayerName] = useState("");
  let [playerLastName, setPlayerLastName] = useState("");
  let status = null;
  let [team1Name, setTeam1Name] = useState("");
  let [team2Name, setTeam2Name] = useState("");
  let [team1Players, setTeam1Players] = useState([
    { offense: [] },
    { defense: [] },
    { keeper: "" },
  ]);
  let [team2Players, setTeam2Players] = useState([
    { offense: [] },
    { defense: [] },
    { keeper: "" },
  ]);
  let [chosenTeam, setChosenTeam] = useState("");
  let [message, setMessage] = useState("");
  let selectedPlayer = [];
  let setNames = () => {
    getNames({ team1Name, team2Name });
  };
  let getData = async (name, lastName) => {
    let response = await axios
      .get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${name} ${lastName}&APIkey=9db2482cf6f788a256a3b0d558805042d498c23f862d7407948c6ae77a39bb19`
      )
      .then((res) => res.data);
    console.log(response);
    if (response && !response.message) {
      selectedPlayer.push({
        name: response[0].player_name,
        img: response[0].player_image,
        rating: response[0].player_rating,
      });
      setMessage("¡Jugador agregado con éxito!");
      status = "Success";
    } else {
      setMessage("El jugador que ingresó no fue encontrado");
      status = "Error";
    }
  };
  const handleClick = () => {
    if (playerName && playerLastName) {
      getData(playerName, playerLastName);
      return message;
    }
  };

  return (
    <div className="card">
      <h4 className="card-header">Elige el nombre de los equipos</h4>
      <div className="input-group-prepend mb-3 card-body">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Equipo 1
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={team1Name}
          onChange={(event) => setTeam1Name(event.target.value)}
        />
      </div>
      <div className="input-group-prepend mb-3 card-body">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Equipo 2
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={team2Name}
          onChange={(event) => setTeam2Name(event.target.value)}
        />
      </div>
      <button onClick={setNames} type="button" className="btn btn-primary m-1">
        Confirmar nombres
      </button>

      <h4 className="card-header">Escribe el nombre de un jugador</h4>
      <div className="input-group mb-3 card-body">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Nombre
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
        />
      </div>
      <div className="input-group mb-3 card-body">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Apellido
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={playerLastName}
          onChange={(event) => setPlayerLastName(event.target.value)}
        />
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value={chosenTeam}
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Equipo 1
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value={chosenTeam}
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Equipo 2
          </label>
        </div>
      </div>

      <button onClick={handleClick} type="button" className="btn btn-primary ">
        Agregar jugador
      </button>
    </div>
  );
}
