import React from 'react'
import { Link } from 'react-router-dom'
import './topbar.css'

export default function Topbar() {
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <div className='logo'>SafeJourney</div>
        </div>
        <div className='topRight'>
          <Link to='/' className='button'>Home</Link>
          <Link to='/about' className='button'>About</Link>
          <Link to='/contact' className='button'>Contact</Link>
        </div>
      </div>
    </div>
  )
}