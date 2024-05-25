import React, { useEffect } from 'react'
import { useUserstate } from '../../Context/UserContext'
import { useNavigate } from 'react-router';
import { IoLogOutOutline } from "react-icons/io5";
import ProfileNavigation from './ProfileNavigation/ProfileNavigation';
import axios from 'axios'

function Profile() {
  const { isloggedIn, refreshOtherPages } = useUserstate();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      if (!confirm("Are you want to logout?")) {
        return;
      }
      localStorage.removeItem('authtoken')
      localStorage.removeItem('msaToken')
      localStorage.removeItem('email')
      localStorage.removeItem('refreshToken')
      refreshOtherPages();
      alert("Logged out successfully!")
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  if(!isloggedIn){
    return (
      <>
        <p>You are not logged in.</p>
      </>
    )
  }

  return (
    <div className='w-full h-full'>
      <div className='relative w-full p-10  h-32 md:h-48 bg-red-100'>
        <img
          className=' absolute -bottom-7 md:-bottom-12 left-20 w-28 md:w-48 border-4 border-white h-28 md:h-48 rounded-full object-cover'
          src='https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200'
        />
        <div className='flex items-center gap-2 float-end md:p-3'>
          <IoLogOutOutline className='text-2xl'/>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div>
        <ProfileNavigation/>
      </div>
    </div>
  )
}

export default Profile