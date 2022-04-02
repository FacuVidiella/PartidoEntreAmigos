import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectPlayers from "./SelectPlayers";
import Field from "./Field";

export default function FootballTeams() {
  let playerInput;
  let [teamOneName, setTeamOneName] = useState("Equipo 1");
  let [teamTwoName, setTeamTwoName] = useState("Equipo 2");
  let teamOne = [];
  let teamTwo = [];
  for (let i = 0; i < 10; i++) {
    if (i < 5) {
      teamOne.push(
        <div
          key={i}
          style={{
            backgroundColor: "white",
            border: "solid",
            height: "50px",
            width: "50px",
            borderRadius: "50px",
          }}
        ></div>
      );
    } else {
      teamTwo.push(
        <div
          key={i}
          style={{
            backgroundColor: "white",
            border: "solid",
            height: "50px",
            width: "50px",
            borderRadius: "50px",
          }}
        ></div>
      );
    }
  }
  function getDataFromChild({ team1Name, team2Name }) {
    if (team1Name) {
      setTeamOneName(team1Name);
    }
    if (team2Name) {
      setTeamTwoName(team2Name);
    }
  }

  return (
    <>
      <SelectPlayers getNames={getDataFromChild} />
      <h5 style={{ textAlign: "center" }}>
        Acá vas a poder visualizar tu partido ideal
      </h5>
      <Field />
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: "1", textAlign: "center" }}>
          <h5>{teamOneName}</h5>
        </div>
        <div style={{ flex: "1", textAlign: "center" }}>
          <h5>{teamTwoName}</h5>
        </div>
      </div>
    </>
  );
}
