import { useState, useEffect } from "react";
import SelectPlayers from "./SelectPlayers";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiReload } from "@mdi/js";

export default function FootballTeams() {
  let [teamOneName, setTeamOneName] = useState("Equipo 1");
  let [teamTwoName, setTeamTwoName] = useState("Equipo 2");
  let [teamOnePlayers, setTeamOnePlayers] = useState([]);
  let [teamTwoPlayers, setTeamTwoPlayers] = useState([]);
  let [defenders1, setDefenders1] = useState([]);
  let [strikers1, setStrikers1] = useState([]);
  let [defenders2, setDefenders2] = useState([]);
  let [strikers2, setStrikers2] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  function getTeamsFromChild({ team1Name, team2Name }) {
    if (team1Name) {
      setTeamOneName(team1Name);
    }
    if (team2Name) {
      setTeamTwoName(team2Name);
    }
  }
  function getPlayersFromChild(player) {
    console.log(player);
    if (player.team === "team1") {
      let validated = true;

      if (player.position === "Delantero") {
        setStrikers1([...strikers1, player]);
      }
      if (player.position === "Defensor") {
        setDefenders1([...defenders1, player]);
      }

      teamOnePlayers.forEach((players) => {
        if (players.name === player.name) {
          validated = false;
        }
        if (players.position === "Arquero" && player.position === "Arquero") {
          validated = false;
        }
        if (strikers1.length >= 2 && player.position === "Delantero") {
          validated = false;
        }
        if (defenders1.length >= 2 && player.position === "Defensor") {
          validated = false;
        }
      });

      if (validated) {
        setTeamOnePlayers([...teamOnePlayers, player]);
        setErrorMessage(null);
      }
    } else if (player.team === "team2") {
      let validated = true;

      if (player.position === "Delantero") {
        setStrikers2([...strikers2, player]);
      }
      if (player.position === "Defensor") {
        setDefenders2([...defenders2, player]);
      }

      teamTwoPlayers.forEach((players) => {
        if (players.name === player.name) {
          validated = false;
        }
        if (players.position === "Arquero" && player.position === "Arquero") {
          validated = false;
        }
        if (
          strikers2.length &&
          strikers2.length >= 2 &&
          player.position === "Delantero"
        ) {
          validated = false;
        }
        if (
          defenders2.length &&
          defenders2.length >= 2 &&
          player.position === "Defensor"
        ) {
          validated = false;
        }
      });

      if (validated) {
        setTeamTwoPlayers([...teamTwoPlayers, player]);
        setErrorMessage(null);
      }
    } else {
      setErrorMessage(player);
    }
  }

  return (
    <>
      <SelectPlayers
        getNames={getTeamsFromChild}
        getPlayers={getPlayersFromChild}
      />
      <h5 style={{ textAlign: "center" }}>
        Acá vas a poder visualizar tu partido ideal
      </h5>
      <p style={{ textAlign: "center" }}>
        (Clickea en el botón para resetear un equipo)
      </p>
      {errorMessage ? (
        <h5 style={{ textAlign: "center", color: "red" }}>* {errorMessage}</h5>
      ) : null}

      <div
        style={{
          display: "flex",
        }}
      >
        <div className="jumbotron m-lg-1" style={{ flex: "1" }}>
          <h1 className="display-4 text-center">
            {teamTwoName !== "Equipo 2" ? teamOneName : "Equipo 1"}
          </h1>
          <div className="lead">
            {teamOnePlayers && teamOnePlayers.length
              ? teamOnePlayers.map((player, i) => {
                  return (
                    <div className="card" key={i}>
                      <div className="card-body">
                        {player.img ? (
                          <img
                            src={player.img}
                            alt="img not found"
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "50px" }}
                          />
                        ) : (
                          <Icon
                            path={mdiAccountCircle}
                            title="Logo"
                            size={2}
                            color="black"
                            horizontal
                          />
                        )}
                        <h5 className="card-header">{player.name}</h5>
                        <h5>{player.position}</h5>
                      </div>
                    </div>
                  );
                })
              : null}
            {teamOnePlayers.length >= 1 ? (
              <button
                className="btn btn-primary"
                type="button"
                style={{ borderRadius: "5px" }}
                onClick={() => setTeamOnePlayers([])}
              >
                <Icon path={mdiReload} size={1} />
              </button>
            ) : null}
          </div>
          <hr className="my-4" />
        </div>
        <div className="jumbotron m-lg-1" style={{ flex: "1" }}>
          <h1 className="display-4 text-center">
            {teamOneName !== "Equipo 1" ? teamTwoName : "Equipo 2"}
          </h1>
          <div className="lead">
            {teamTwoPlayers && teamTwoPlayers.length
              ? teamTwoPlayers.map((player, i) => {
                  return (
                    <div className="card" key={i}>
                      <div className="card-body">
                        {player.img ? (
                          <img
                            src={player.img}
                            alt="img not found"
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "50px" }}
                          />
                        ) : (
                          <Icon
                            path={mdiAccountCircle}
                            title="Logo"
                            size={2}
                            color="black"
                            horizontal
                          />
                        )}
                        <h5 className="card-header">{player.name}</h5>
                        <h5>{player.position}</h5>
                      </div>
                    </div>
                  );
                })
              : null}
            {teamTwoPlayers.length >= 1 ? (
              <button
                className="btn btn-primary"
                type="button"
                style={{ borderRadius: "5px" }}
                onClick={() => setTeamTwoPlayers([])}
              >
                <Icon path={mdiReload} size={1} />
              </button>
            ) : null}
          </div>
          <hr className="my-4" />{" "}
        </div>
      </div>
    </>
  );
}
