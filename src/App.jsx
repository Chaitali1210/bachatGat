import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </>
  )
}

export default App
