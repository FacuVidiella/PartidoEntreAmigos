import React, { useState, useEffect } from "react";

import Match from "./Match";
import SelectPlayers from "./SelectPlayers";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm"></div>
      </div>
      <Match />
    </div>
  );
}
