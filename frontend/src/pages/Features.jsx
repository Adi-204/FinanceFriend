import React from 'react'
import { NavLink } from 'react-router-dom'

const Features = () => {
  return (
    <div>
      <h1>Features</h1>
      <NavLink to='/features/chatbot' className='m-5'>Chatbot</NavLink>
      <NavLink to='/features/advisor'>Financial Planner</NavLink>
      <NavLink to='/features/risk' className='m-5'>Risk Assessment</NavLink>
    </div>
  )
}

export default Features
