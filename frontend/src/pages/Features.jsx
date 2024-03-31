import React,{ useEffect, useState } from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom";
// import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Features = () => {

  const [user,setUser] = useState([]);

  // const axiosPrivate = useAxiosPrivate();
  const {accessToken} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
      const getUser = async()=>{
          try {
            const response = await axios.get('/api/notes/',{
              headers : {
                Authorization : `Bearer ${accessToken}`
              }
            });
            setUser(response.data);
          } catch (error) {
            console.log(error);
            navigate("/login",{state:{from:location},replace:true});
          }
      }
      getUser();
  },[])
  
  const users = user.map((ele)=>{
    return (
      <div key={ele.id}>
        <h1>{ele.firstname}</h1>
        <h1>{ele.lastname}</h1>
      </div>
    )
  })
  
  return (
    <div>
      <h1>Feature Access Token</h1>
      {users}
      <Link to='/features/chatbot'>Chatbot</Link>
    </div>
  )
}

export default Features
