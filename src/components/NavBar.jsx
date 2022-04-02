import React from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiSoccer } from "@mdi/js";

export default function NavBar() {
  return (
    <div
      className="d-flex flex-row align-items-center "
      aria-label="Basic example"
      style={{ backgroundColor: "#1c2841", height: "100px", color: "white" }}
    >
      <div style={{ flex: "1", marginLeft: "15px" }}>
        <Icon
          path={mdiSoccer}
          title="Logo"
          size={3}
          horizontal
          vertical
          rotate={90}
          color="white"
          spin
        />
      </div>
      <div style={{ flex: "2", textAlign: "center" }}>
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          <h5>Inicio</h5>
        </Link>
      </div>
      <div style={{ flex: "1", textAlign: "left" }}>
        <h5>Acerca de...</h5>
      </div>
      <div style={{ flex: "1", textAlign: "left", marginRight: "10px" }}>
        <h5>Iniciar sesión</h5>
      </div>
    </div>
  );
}
