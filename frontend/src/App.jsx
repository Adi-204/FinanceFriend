import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import {Signup} from './pages/Signup';
import {Login} from './pages/Login';
import Features from './pages/Features';
import RequireAuth from './components/RequireAuth';
import Chatbot from './pages/Chatbot';
import UserDetail from './pages/UserDetail';
import DashBoard from './pages/DashBoard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

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
