import React from "react";
import User from "./Lab portal/Componet/User";
import Addpc from "./Lab portal/Componet/Addpc";
import Assign from "./Lab portal/Componet/Assign";
import Header from "./Lab portal/Componet/Header";
import Dash from "./Lab portal/Componet/Dash";
import Login from "./Lab portal/Componet/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Lab portal/Routes/Protectedroutes";
import { Home } from "./Lab portal/Componet/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={<Protected Cmp={Dash} />} />
          <Route path="/user" element={<Protected Cmp={User} />} />
          <Route path="/pc" element={<Protected Cmp={Addpc} />} />
          <Route path="/assign" element={<Protected Cmp={Assign} />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
