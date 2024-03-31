import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import {Signup} from './pages/Signup';
import {Login} from './pages/Login';
import Features from './pages/Features';
import RequireAuth from './components/RequireAuth';
import Blogs from './pages/Blogs';
import Chatbot from './pages/Chatbot';
import UserDetail from './pages/UserDetail';
import DashBoard from './pages/DashBoard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public route */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          {/* Private route */}
          <Route element={<RequireAuth />}>
            <Route path='/user-detail' element={<UserDetail />} />

            <Route path='/features' element={<Features />} />
            <Route path='/features/chatbot' element={<Chatbot />} />
            <Route path='/dashboard' element={<DashBoard />} />
            
          </Route>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
