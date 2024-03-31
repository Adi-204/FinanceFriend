import React from 'react'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Loading from "../components/Loading";
import { HiUpload } from "react-icons/hi";
import { useState } from 'react'

const CustomChat = () => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const { accessToken } = useAuth();
  const [customForm,setCustomForm] = useState({
    chat : "",
    type : "custom"
  })
  const [output, setOutput] = useState([]);

  const onChangeCustomHandler = (e)=>{
    const {name,value} = e.target;
    setCustomForm((prevData)=>{
      return {
        ...prevData,
        [name] : value
      }
    })
  }

  const handleCustomSubmit = (e) =>{
    e.preventDefault();
    const sendPrompt = async()=>{
        try {
          setLoading(true);
          setCustomForm({
            chat : "",
            type : "custom"
          })
          const response = await axios.post("/api/chatbot/",customForm,{
            headers : {
              Authorization : `Bearer ${accessToken}`
            }
          });
          setOutput(response);
          console.log(output);
        } catch (error) {
            setError(error.response.data);
        }
        finally{
          setLoading(false);
        }
    }
    sendPrompt();
  }

  if(loading){
    return <Loading />
  }

  return (
    <div>
       <form onSubmit={handleCustomSubmit} className="flex items-center justify-center mt-8">
        <div 
        className="flex items-center bg-gray-700 text-white rounded-l px-4 py-2"
        style={{ borderRadius: '1rem' }}
        >
          <input
            type="text"
            placeholder='Ask Me Anything...'
            id="chat"
            name="chat"
            value={customForm.chat}
            onChange={onChangeCustomHandler}
            className="w-[35vw]  bg-transparent text-white border-none focus:outline-none"
          />
          <button type="submit" className="bg-gray-700 text-white rounded-r px-4 py-2 hover:bg-gray-600">
            <HiUpload size={25} />
          </button>
        </div>
      </form>
    </div>
  )
}



export default CustomChat