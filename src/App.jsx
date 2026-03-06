import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './Component/Homepge/Homepage'
import CreateAccount from './Component/CreateAccount/CreateAccount'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </div>
  )
}
export default App
