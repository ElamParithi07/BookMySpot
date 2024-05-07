import React from 'react'
import { CiMail } from "react-icons/ci";

function EditProfile() {
  return (
    <div className='h-full flex flex-col gap-10'>
      <div className=''>
        <p className='text-2xl font-medium'>Profile</p>
      </div>
      <div className='flex flex-col justify-evenly gap-10'>
        <div className='flex items-center gap-3'>
          <CiMail className='text-2xl'/>
          <p>elamparthi.s2021it@sece.ac.in</p>
        </div>
        <button className='border p-3 w-fit rounded-lg'>Change Password</button>
      </div>
    </div>
  )
}

export default EditProfile