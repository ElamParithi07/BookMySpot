import React from 'react'
import { IoMdStar } from 'react-icons/io'
import { PiPhoneCallFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

function Wishlistcard({ data }) {
  console.log(data)
  const imageUrl = 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200'
  return (
    <div className='flex flex-col h-2/12 w-full md:h-3/4 md:w-2/6'>
      <Link
        to={{
          pathname: `/spots/${data._id}`
        }}
        state={
          { isTrue: true }
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
        <div className='flex gap-1 items-center'>
          <IoMdStar className='placecardtext' />
          <p className='placecardtext'>{"4.5"}</p>
        </div>
      </div>
      <div className='flex gap-3 items-center'>
        <p className='text-xs md:text-sm text-slate-500'>{data.location}</p>
      </div>
    </div>
  )
}

export default Wishlistcard