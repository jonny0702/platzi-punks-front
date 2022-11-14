import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Punks } from "./pages/Punks/Punks";
import { Punk } from "./pages/Punk/Punk";
import { MainLayout } from "./layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/punks" element={<Punks />} />
        <Route path="/punks/:tokenId" element={<Punk />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
