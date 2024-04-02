import React from 'react'
import Loading from "../components/Loading";
import { HiUpload } from "react-icons/hi";
import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const CustomChat = () => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [customForm,setCustomForm] = useState({
    chat : "",
    type : "custom"
  })
  const [output, setOutput] = useState([]);
  const api = useAxiosPrivate();
  const [isoutput,setIsOutput] = useState(true);

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
          setIsOutput(false);
          const response = await api.post(`${import.meta.env.VITE_URL}/api/chatbot/`,customForm);
          setOutput(response.data);
          setIsOutput(true);
          setCustomForm({
            chat : "",
            type : "custom"
          })
        } catch (error) {
            setError(error.response.data);
        }
        finally{
          setLoading(false);
        }
    }
    sendPrompt();
  }


  const renderOutput = output.length > 0 && (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white m-4 rounded-lg p-4 shadow-lg">
      {output.map((ele, ind) => (
        <div key={ind}>
          {ele.content && <p>{ele.type}</p>}
          <p>{ele.content}</p>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className='flex flex-col h-[70vh] justify-between items-center'>
      {loading && <Loading/> }
      {
        isoutput &&
        <div className='h-[60vh]'>
          {output.length>0 && renderOutput}
        </div>
      }
       <form onSubmit={handleCustomSubmit} className="flex items-center justify-center mt-8">
        <div className='flex items-center'>
          <input
            type="text"
            placeholder='Ask Me Anything...'
            id="chat"
            name="chat"
            value={customForm.chat}
            onChange={onChangeCustomHandler}
            className="lg:w-[35vw] w-60 p-2 border-2 border-black  rounded-3xl"  
          />
          <button type="submit" className="text-black px-2 py-2">
            <HiUpload size={25} />
          </button>
        </div>
      </form>
    </div>
  )
}



export default CustomChat