import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Component/Homepge/Homepage'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
