import { useState } from "react";
import SelectPlayers from "./SelectPlayers";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiReload } from "@mdi/js";
import { Button } from "bootstrap";

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

  const handleResetForTeamOne = () => {
    setTeamOnePlayers([]);
    setDefenders1([]);
    setStrikers1([]);
  };

  const handleResetForTeamTwo = () => {
    setTeamTwoPlayers([]);
    setDefenders2([]);
    setStrikers2([]);
  };

  function getTeamsFromChild({ team1Name, team2Name }) {
    if (team1Name) {
      setTeamOneName(team1Name);
    }
    if (team2Name) {
      setTeamTwoName(team2Name);
    }
  }
  function getPlayersFromChild(player) {
    let oneHasPlayer = teamOnePlayers.some((one) => one.name === player.name);
    let twoHasPlayer = teamTwoPlayers.some((two) => two.name === player.name);

    if (!teamOnePlayers.length && !teamTwoPlayers.length) {
      setErrorMessage(null);
    }
    if (player && player.team === "randomized") {
      let bothTeams = ["1", "2"];
      let randomTeam = bothTeams[Math.floor(Math.random() * bothTeams.length)];
      if (randomTeam === "1") {
        player.team = "team1";
      } else if (randomTeam === "2") {
        player.team = "team2";
      }
    }

    if (player.team === "team1") {
      let validated = true;
      if (oneHasPlayer || twoHasPlayer) {
        validated = false;
        setErrorMessage("El jugador ya existe");
      }
      if (!validated) {
        return;
      }
      if (player.position === "Delantero" && strikers1.length < 2) {
        setStrikers1([...strikers1, player]);
      }
      if (strikers1.length >= 2 && player.position === "Delantero") {
        validated = false;
        setErrorMessage("No pueden haber más de dos delanteros por equipo");
      }
      if (player.position === "Defensor" && defenders1.length < 2) {
        setDefenders1([...defenders1, player]);
      }
      if (defenders1.length >= 2 && player.position === "Defensor") {
        validated = false;
        setErrorMessage("No pueden haber más de dos defensores por equipo");
      }
      teamOnePlayers.forEach((players) => {
        if (players.position === "Arquero" && player.position === "Arquero") {
          validated = false;
          setErrorMessage("No puede haber más de un arquero por equipo");
        }
      });

      if (validated) {
        setTeamOnePlayers([...teamOnePlayers, player]);
        setErrorMessage(null);
      }
    } else if (player.team === "team2") {
      let validated = true;
      if (oneHasPlayer || twoHasPlayer) {
        validated = false;
        setErrorMessage("El jugador ya existe");
      }

      if (!validated) {
        return;
      }

      if (player.position === "Delantero" && strikers2.length < 2) {
        setStrikers2([...strikers2, player]);
      }
      if (strikers2.length >= 2 && player.position === "Delantero") {
        validated = false;
        setErrorMessage("No pueden haber más de dos delanteros por equipo");
      }
      if (player.position === "Defensor" && defenders2.length < 2) {
        setDefenders2([...defenders2, player]);
      }
      if (defenders2.length >= 2 && player.position === "Defensor") {
        validated = false;
        setErrorMessage("No pueden haber más de dos defensores por equipo");
      }
      teamTwoPlayers.forEach((players) => {
        if (players.position === "Arquero" && player.position === "Arquero") {
          validated = false;
          setErrorMessage("No puede haber más de un arquero por equipo");
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
        Acá vas a poder visualizar tu partido
      </h5>
      <p style={{ textAlign: "center" }}>
        (Clickeá en el botón para resetear un equipo)
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
                onClick={handleResetForTeamOne}
              >
                resetear
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
                        <button
                          variant="dark"
                          onClick={() => setTeamTwoPlayers(this.remove(i))}
                        >
                          X
                        </button>
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
                onClick={handleResetForTeamTwo}
              >
                resetear
              </button>
            ) : null}
          </div>
          <hr className="my-4" />{" "}
        </div>
      </div>
    </>
  );
}
