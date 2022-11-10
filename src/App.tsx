import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { MainLayout } from "./layout/MainLayout";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
