import React from 'react'
import { useUserstate } from '../../Context/UserContext'
import { useNavigate } from 'react-router';

function Profile() {
  const {isloggedIn, refreshOtherPages}= useUserstate();
  const navigate = useNavigate()
  const handleLogout =async()=>{
    try{
      if(!confirm("Are you want to logout?")){
        return ;
      }
      localStorage.removeItem('authtoken')
      refreshOtherPages();
      alert("Logged out successfully!")
      navigate('/')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div className='w-full h-48 bg-red-100'>
          <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile