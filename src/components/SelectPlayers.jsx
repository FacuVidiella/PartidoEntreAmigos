import { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";

export default function SelectPlayers({ getNames, getPlayers }) {
  let [validation, setValidation] = useState({
    team1Name: true,
    team2Name: true,
  });
  let [playerName, setPlayerName] = useState("");
  let [playerLastName, setPlayerLastName] = useState("");
  let [team1Name, setTeam1Name] = useState("");
  let [team2Name, setTeam2Name] = useState("");
  let [show, setShow] = useState(false);
  let setNames = () => {
    if (!team1Name && team2Name) {
      setValidation({ team1Name: false, team2Name: true });
      setShow(false);
    }
    if (!team2Name && !team2Name) {
      setValidation({ team2Name: false, team1Name: true });
      setShow(false);
    }
    if (!team1Name && !team2Name) {
      setValidation({ team1Name: false, team2Name: false });
      setShow(false);
    } else if (team1Name && team2Name) {
      setValidation({ team1Name: true, team2Name: true });
      getNames({ team1Name, team2Name });
      setShow(true);
    }
  };
  let [position, setPosition] = useState("");
  let [load, setLoad] = useState(false);
  let handlePositions = (e) => {
    setPosition(e);
  };
  let [chosenTeam, setChosenTeam] = useState("");
  let [message, setMessage] = useState("");
  let setSelectedPlayer = [];
  let getData = async (name, lastName) => {
    setLoad(true);

    if (position !== "choose" && position !== "") {
      if (position === "offense") {
        position = "Delantero";
      } else if (position === "defense") {
        position = "Defensor";
      } else if (position === "keeper") {
        position = "Arquero";
      }

      setSelectedPlayer.push({
        name: `${name} ${lastName}`,
        position,
        team: chosenTeam,
      });

      if (setSelectedPlayer.length) {
        getPlayers(setSelectedPlayer[0]);
      }
      setLoad(false);
    } else {
      setMessage(
        "El jugador que ingresó no fue encontrado u olvidó completar algún campo"
      );
      getPlayers(message);
      setLoad(false);
    }
  };

  const handleClick = () => {
    if (playerName && playerLastName) {
      getData(playerName, playerLastName);
    }
  };

  return (
    <div>
      <div className="card">
        <h4 className="card-header">Elegí el nombre de los equipos</h4>
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
          {!validation.team1Name ? (
            <div style={{ color: "red" }}>
              "Ups! Olvidaste completar este campo"
            </div>
          ) : null}
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
          {!validation.team2Name ? (
            <div style={{ color: "red" }}>
              "Ups! Olvidaste completar este campo"
            </div>
          ) : null}
        </div>
        <button
          onClick={setNames}
          type="button"
          className="btn btn-primary m-1"
        >
          Confirmar nombres
        </button>
      </div>

      <hr />

      <div className={show ? "card" : "visually-hidden"}>
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
        <div className="input-group mb-3 card-body">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(event) => handlePositions(event.target.value)}
          >
            <option value="choose">Elegí la posición de tu jugador</option>
            <option value="offense">Delantero</option>
            <option value="defense">Defensor</option>
            <option value="keeper">Arquero</option>
          </select>
        </div>
        <div className="d-flex flex-row justify-content-evenly">
          <div className="form-check mb-3 ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="team1"
              onInput={(event) => setChosenTeam(event.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Equipo 1
            </label>
          </div>
          <div className="form-check mb-3 ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="team2"
              onInput={(event) => setChosenTeam(event.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Equipo 2
            </label>
          </div>
          <div className="form-check mb-3 ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="randomized"
              onInput={(event) => setChosenTeam(event.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Randomizar
            </label>
          </div>
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-primary m-1"
        >
          Agregar jugador
          {load ? (
            <div>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span> Loading...</span>
            </div>
          ) : null}
        </button>{" "}
      </div>
      <hr />
    </div>
  );
}
