import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  return (
    <div className='wrapper'>
      
      <div className='left'>
        <p>Book Your Tickets Online</p> <br/>
        <p className='quote'>Travel Is An Investment In Yourself.</p><br/>
        <Link to='/login' className='lrbtn'>GET STARTED</Link>
      </div>
      
      <div className='right'>
        <img src='https://img.freepik.com/free-vector/passengers-waiting-bus-city-queue-town-road-flat-vector-illustration-public-transport-urban-lifestyle_74855-8493.jpg?w=1380&t=st=1672835730~exp=1672836330~hmac=e1dab8b770864370730b233355d91e473b3892a7dc15b20e4d43fc16696b0490' alt='' width="1000px"/>
      </div>
    
    </div>
  )
}
