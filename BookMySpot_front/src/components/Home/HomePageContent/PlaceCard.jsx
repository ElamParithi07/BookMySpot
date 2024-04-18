import React from 'react'
import { IoMdStar } from "react-icons/io";
// import { FaRegHeart } from "react-icons/fa";

function PlaceCard({ name, rating, imageurl }) {
  const imageUrl = 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200'

  return (
    <div className='flex flex-col h-2/12 w-full md:h-3/4 md:w-2/6 p-4'>
      <img
        alt={`location`}
        src={imageUrl}
        className=' h-4/5 md:h-1/3 w-full rounded-md shadow-md cursor-pointer'
      />
      <div className='flex justify-between'>
        <p className='placecardtext'>{name}</p>
        <div className='flex gap-1 items-center'>
          <IoMdStar className='placecardtext' />
          <p className='placecardtext'>{rating}</p>
        </div>
      </div>
      <p className='text-xs md:text-sm text-slate-500'>2,500 Kilometers away</p>
      <p className='text-xs md:text-sm text-slate-500'>21-25 Jun</p>
      <div className='flex gap-2 items-center'>
        <p className='placecardtext'>$1,200</p>
        <p className='placecardtext'>night</p>
      </div>
      
    </div>
  )
}

export default PlaceCard
