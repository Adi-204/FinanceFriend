import React,{ useEffect, useState } from 'react'
import {useLocation,useNavigate} from "react-router-dom";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Features = () => {

  const [user,setUser] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
      const getUser = async()=>{
          try {
            const response = await axiosPrivate.get('/api/notes/');
            setUser(response.data);
          } catch (error) {
            console.log(error);
            // navigate("/login",{state:{from:location},replace:true});
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
    </div>
  )
}

export default Features