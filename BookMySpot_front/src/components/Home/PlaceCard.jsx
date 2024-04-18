import React from 'react'
import { IoMdStar } from "react-icons/io";

function PlaceCard() {
  const imageUrl = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <div className='flex flex-col lg:h-96 lg:w-96 md:h-60 md:w-60'>
      <img src={imageUrl} alt={"Hotel"} className='h-80 w-full md:rounded-lg shadow-md' />
      <div className='flex flex-col py-4 justify-evenly'>
        <div className='flex justify-between'>
          <h2 className='text-lg'>Jibhi, India</h2>
          <div className='flex gap-1 items-center'>
            <IoMdStar className='text-lg'/>
            <p>2.7</p>
          </div>
        </div>
        <p className='text-slate-500 text-sm'>2,291 Kilometers away</p>
        <p className='text-slate-500 text-sm'>28-29 May</p>
        <div className='flex gap-2'>
          <p className='text-md font-semibold'>$1,300</p>
          <p className='text-md'>night</p>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard
