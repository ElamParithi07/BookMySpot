import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Booking() {
  const authtoken = localStorage.getItem('authtoken')
  const [ bookingList, setBookingList] = useState([])


  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get('http://localhost:8083/book/getbooking',{
          headers:{
            'Authorization':`Bearer ${authtoken}`,
            'Content-Type':'application/json'
          } 
        })
        const responseData = response.data
        setBookingList(responseData.data)
      }
      catch(error){
        console.log(error.response)
      }
    }
    fetchData()
  },[])

  if(bookingList.length===0){
    return (
      <div>
        <p>you have not booked any yet..</p>
      </div>
    )
  }

  return (
    <div>
      {
        bookingList.map((booking)=>{
          return (
            <p>booking</p>
          )
        })
      }
    </div>
  )
}

export default Booking