import React, { useEffect, useState } from 'react';
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import { PiPhoneCallFill } from "react-icons/pi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from 'axios';
import { createnewtoken } from '../../RefreshSession/RefreshUser';

function PlaceCard({ data, saved }) {
  const [issaved, setSaved] = useState(false);
  const imageUrl = 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';

  useEffect(() => {
    if (saved.includes(data._id)) {
      setSaved(true);
    }
  }, [saved, data._id]);

  async function handleSave() {
    try {
      const authtoken = localStorage.getItem('authtoken');
      if (!authtoken) {
        alert("Log in to save the spot");
        return;
      }
      if (issaved) {
        await axios.post("http://localhost:8083/auth/removefromlist", { spotid: data._id }, { headers: { 'Authorization': `${authtoken}`, 'Content-Type': 'application/json' } });
        setSaved(false);
        alert("Spot removed from wish list");
        return;
      }
      await axios.post("http://localhost:8083/auth/addtolist", { spotid: data._id }, { headers: { 'Authorization': `${authtoken}`, 'Content-Type': 'application/json' } });
      setSaved(true);
      alert("Spot added to wish list");
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        if (error.response.status === 401) {
          await createnewtoken(localStorage.getItem('email'));
          await handleSave();
        } else if (error.response.status === 400) {
          alert('Invalid Auth Token');
        } else {
          alert('Unexpected Error:', error.response.data);
        }
      } else {
        alert('Error:', error.message);
      }
    }
  }

  return (
    <div className='flex flex-col h-2/12 w-full md:h-3/4 md:w-2/6 p-4'>
      <Link
        to={{
          pathname: `/spots/${data._id}`
        }}
        state={
          {isTrue: issaved}
        }
        className='h-4/5 md:h-1/3 w-full'
      >
        <img
          alt={`location`}
          src={imageUrl}
          className='h-full md:h-1/3 w-full rounded-md shadow-md cursor-pointer'
        />
      </Link>

      <div className='flex justify-between'>
        <p className='placecardtext'>{data.name}</p>
        <div className='flex items-center justify-center gap-4'>
          <div className='flex gap-1 items-center'>
            <IoMdStar className='placecardtext' />
            <p className='placecardtext'>{"4.5"}</p>
          </div>
          <button onClick={handleSave}>{issaved ? <AiFillHeart className='text-primary text-xl' /> : <AiOutlineHeart className='text-xl' />}</button>
        </div>
      </div>
      <div className='flex gap-3 items-center'>
        <p className='text-xs md:text-sm text-slate-500'>{data.location}</p>
        <p className='flex items-center text-xs md:text-sm text-slate-500'><PiPhoneCallFill className='text-sm text-black' /> : {data.phonenumber}</p>
      </div>
      <div className='flex gap-2 items-center'>
        <p className='placecardtext'>₹{data.feeperhour}</p>
        <p className='text-xs'>/ hour</p>
      </div>
    </div>
  );
}

export default PlaceCard;
