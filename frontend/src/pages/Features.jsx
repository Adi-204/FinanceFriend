import React from 'react'
import { NavLink } from 'react-router-dom'

const Features = () => {
  return (
    <div>
      <h1>Features</h1>
      <NavLink to='/features/chatbot'>Chatbot</NavLink>
      <NavLink to='/features/advisor'>Financial Planner</NavLink>
    </div>
  )
}

export default Features
