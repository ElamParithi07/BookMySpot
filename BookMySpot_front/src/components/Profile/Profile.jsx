import React, { useEffect, useState } from 'react'
import { useUserstate } from '../../Context/UserContext'
import { useNavigate } from 'react-router';
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios'
import { CgNotes } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { FaExternalLinkAlt, FaPlaceOfWorship } from "react-icons/fa";
import Wishlistcard from './Wishlistcard';
import { MdPolicy } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { createnewtoken } from '../RefreshSession/RefreshUser';

function Profile() {
  const { isloggedIn, refreshOtherPages } = useUserstate();
  const [data, setdata] = useState({ saved: [] });
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      if (!confirm("Are you want to logout?")) {
        return;
      }
      const authtoken = localStorage.getItem('authtoken')
      const res = await axios.delete('http://localhost:8083/auth/removedata',
        {
          headers: {
            'Authorization': `${authtoken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      localStorage.clear();
      refreshOtherPages();
      alert("Logged out successfully!")
      navigate('/')
    }
    catch (error) {
      console.log(error.message)
      if (error.response) {
        console.log(error.response.data); // response data
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log('Token expired')
          const email = localStorage.getItem('email')
          await createnewtoken(email)
          await handleLogout();
        } else if (error.response.status === 400) {
          alert('Invalid Auth Token');
        } else {
          console.log('Unexpected Error:', error.response.data);
        }
      } else if (error.request) {
        console.log(error.request);
        alert('No response from the server');
      } else {
        console.log('Error:', error.message);
        alert('Error:', error.message);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("inside effect")
        const authtoken = localStorage.getItem('authtoken')
        if(!authtoken){
          return ;
        }
        const response = await axios.get('http://localhost:8083/auth/getprofile', {
          headers: {
            'Authorization': `${authtoken}`,
            'Content-Type': 'application/json'
          }
        })
        const responseData = response.data;
        setdata(responseData)
        console.log(responseData)
      }
      catch (error) {
        console.log(error.message)
        if (error.response) {
          console.log(error.response.data); // response data
          console.log(error.response.status);
          if (error.response.status === 401) {
            console.log('Token expired')
            const email = localStorage.getItem('email')
            await createnewtoken(email)
            await fetchData();
          } else if (error.response.status === 400) {
            alert('Invalid Auth Token');
          } else {
            console.log('Unexpected Error:', error.response.data);
          }
        } else if (error.request) {
          console.log(error.request);
          alert('No response from the server');
        } else {
          console.log('Error:', error.message);
          alert('Error:', error.message);
        }
      }
    }
    fetchData();
  }, [])

  if (!isloggedIn) {
    return (
      <>
        <p>You are not logged in.</p>
      </>
    )
  }

  return (
    <div className='w-full h-full '>
      <div className="w-full px-8 py-16 md:px-40 md:py-24 h-32 md:h-48 bg-[url('https://img.freepik.com/free-vector/travel-around-world-postcard-tourism-vacation-earth-world-journey-global_1284-46582.jpg?t=st=1717657381~exp=1717660981~hmac=d0977af0f194c5ab31a058f786f2b10f7b2b9fae1075e2c122d025560b59bd7f&w=1380')] bg-cover">
        <img
          className='w-32 md:w-48 border-white h-32 md:h-48 rounded-full object-cover'
          src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
        />
      </div>
      <div className='w-full h-full flex flex-col gap-8 px-8 pt-20 md:px-96 md:py-16 '>
        <div className='bg-white flex flex-col gap-2'>
          <div className=' flex justify-between border-l-2 border-primary px-4'>
            <p className='text-xl md:text-3xl font-medium'>User</p>
            <button className='flex items-center gap-2 text-xs md:text-sm bg-slate-100 p-1 md:p-2 rounded-lg text-slate-700 ' onClick={()=>navigate('/profile/history',{state:data.history})}>view history<FaExternalLinkAlt className='text-xs md:text-sm' /></button>
          </div>
          <div className='px-4'>
            <p className='text-sm md:text-base'>{data.email}</p>
          </div>
        </div>
        <hr></hr>
        <div className='bg-white flex flex-col gap-2'>
          <div className='flex items-center  gap-5 border-l-2 border-primary px-4'>
            <p className='text-lg md:text-xl font-medium'>My Wishlist</p>
            <button className='flex items-center gap-2 text-xs md:text-sm text-slate-500' onClick={()=>navigate('/profile/wishlist',{state:data.saved})}>View full list<FaExternalLinkAlt className='text-xs md:text-sm' /></button>
          </div>
          <div className='flex md:gap-3 px-4 py-4'>
              {data.saved && data.saved.length > 0 ? data.saved.map((item, index) => (
                <Wishlistcard key={index} data={item}/>
              )) : 
              <p>Wishlist is empty..</p>}
          </div>
        </div>
        <div className='bg-white flex flex-col gap-2 mb-20 md:mb-0'>
          <div className='flex items-center  gap-5 border-l-2 border-primary px-4'>
            <p className='text-lg md:text-xl font-medium'>Settings</p>
          </div>
          <div className='px-4'>
            <div className='py-4 border-b-2'>
              <Link to="/addmyspot">
                <button className='flex items-center gap-4 text-sm md:text-base'><FaPlaceOfWorship className='text-xl' />View My Spot</button>
              </Link>
            </div>
            <div className='py-4 border-b-2'>
              <button className='flex items-center gap-4 text-sm md:text-base'><MdPolicy className='text-xl' />Privacy Policy</button>
            </div>
            <div className='py-4 border-b-2'>
              <button className='flex items-center gap-4 text-sm md:text-base'><CgNotes className='text-xl' />Terms & condition</button>
            </div>
            <div className='py-4'>
              <button onClick={handleLogout} className='flex gap-4 items-center text-red-600 text-sm md:text-base'><AiOutlineLogout className='text-xl' />Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
