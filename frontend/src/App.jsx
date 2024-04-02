import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import {Signup} from './pages/Signup';
import {Login} from './pages/Login';
import Features from './pages/Features';
import RequireAuth from './components/RequireAuth';
import Chatbot from './pages/Chatbot';
import UserDetail from './pages/UserDetail';
import DashBoard from './pages/DashBoard';
import PersistLogin from './components/PersistLogin';
import Advisor from './pages/Advisor';

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Layout />}>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/user-detail' element={<UserDetail />} />
              <Route path='/features' element={<Features />} />
              <Route path='/features/chatbot' element={<Chatbot />} />
              <Route path='/features/advisor' element={<Advisor />} />
              <Route path='/dashboard' element={<DashBoard />} />
            </Route>
          </Route>
          
        </Route>
      </Routes>
    </>
  )
}

export default App
