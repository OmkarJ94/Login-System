import React from 'react'
import './App.css';
import Signup from './Components/Signup'
import { Routes, Route } from 'react-router-dom';
import Login from "./Components/Login"
import Informationone from './Components/Informationone';
import ForgetPassword from "./Components/ForgetPassword"


function App() {
  return (
    <>

      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profilepage" element={<Informationone />} />
        <Route exact path="/changepassword" element={<ForgetPassword />} />

      </Routes>



    </>
  );
}

export default App;
