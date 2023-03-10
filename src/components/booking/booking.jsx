import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { redirect,  useSearchParams } from 'react-router-dom'

function Booking() {
    const [searchBus, setSearchBus] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    
    const fromCity = searchParams.get("from");
    const toCity = searchParams.get("to");
    const date = searchParams.get("date");
    console.log(searchParams)
    useEffect(()=>{
        console.log(searchParams)

    },[])
   
    // useEffect(() => {
    //    getSearchBus();
    //   }, [])
    
    
    
    //   const getSearchBus = () => {
    //       setLoading(true);
    
    //       axios.get(" ")
    //           .then(res => {
    //             setSearchBus(res.data)
    //               setLoading(false)
    //           })
    //           .catch(err => {
    //               console.log(err)
    
    
    //           })
    
    //   }
      useEffect(() => {
        setLoading(true)
        if(fromCity & toCity & date){
            axios.get(" ")
            .then(res => {
                setSearchBus(res.data) 
                setLoading(false)
            }) 
            .catch(err=> {
                console.log(err)
            })
        }else{
            redirect("/")
        }         
       
     },[])
    



  return (
    <div>        
        {loading && <div>Loading....</div>}
        <h2>Available Buses</h2>
      {/* <ul>
        {searchBus.map(bus => (
          <li key={bus.id}>
            {bus.name} 
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default Booking