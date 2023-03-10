import React from 'react'
import "./App.css";
import ForgotPassword from "./components/forgot-password/forgot-password";
import LoginForm from "./components/login/login-form";
import RegisterForm from "./components/register/register-form";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from './components/contact/Contact';
import FromToPage from "./components/from-to-page/from-to-page";
import Booking from './components/booking/booking';



function App() {
  return (
    <>
          <Topbar/>
        
        <div className="container">
      <Routes>  
      
        <Route path="/" element={<Home />} />  
        <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>   
          <Route path="/register" element={<RegisterForm/>}/>   
          <Route path="/login" element={<LoginForm/>}/>   
          <Route path="/forgot-password" element={<ForgotPassword/>}/> 
          <Route path="/booking" element={<Booking />}/> 
          <Route path="/from-to-page" element={<FromToPage />}/>
          </Routes>                  
            
       </div>  
       {/* <SearchForm />   */}
       
      
    </>
  );
}

export default App;
