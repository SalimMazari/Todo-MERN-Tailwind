import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Home from "./components/Home";
import Idea from "./components/Idea";
import IdeaForm from "./components/IdeaForm";
import Confettis from "./components/Confettis";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/idea" element={<Idea />} />
        <Route path="/idea-form" element={<IdeaForm />} />
        <Route path="/confettis" element={<Confettis />} />
      </Routes>
    </div>
  );
};

export default App;
