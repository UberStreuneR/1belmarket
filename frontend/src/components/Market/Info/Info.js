import React from "react";
import { Routes, Route } from "react-router-dom";
import Team from "./Team";
import Privacy from "./Privacy";
export default function Info() {
  return (
    <>
      <Routes>
        <Route exact path="team/" element={<Team />} />
        <Route exact path="privacy-policy/" element={<Privacy />} />
      </Routes>
    </>
  );
}
