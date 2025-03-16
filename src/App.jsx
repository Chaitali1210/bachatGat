import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from "./components/Sidebar";



const App = () => {
  return (
    <>
      <Routes>
        <Route path='/sidebar' element={<Sidebar/>} />
        <Route path='/' element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
