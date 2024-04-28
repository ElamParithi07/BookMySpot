import React, { useState } from 'react'
import { TbBrandAirbnb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";

function UserLogin() {
    const [ispasshow, setpasshow] = useState(false)

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                    <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold'>Login to your Account</p>
                    <p className='text-xs md:text-base'>Don't have an account yet? <Link className='text-primary' to='/signup'>Signup</Link></p>
                </div>
                <form className='w-4/5 h-52 flex flex-col justify-evenly md:w-full'>
                    <input
                        type='text'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Enter email address'
                    />
                    {ispasshow && <input
                        type='text'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Enter password'
                    />}
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <input 
                                type='checkbox'
                                className='text-xs md:text-sm'
                            />
                            <p className='text-xs md:text-sm'>Remember me</p>
                        </div>
                        <button className='text-primary text-xs md:text-sm'>Forgot your password?</button>
                    </div>
                    <button className='w-full bg-primary h-10 text-white rounded-md'>
                        <Link to={'/otpauth'}>Send OTP</Link>
                    </button>
                </form>
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                    <FiArrowLeft/>
                    <Link to={'/'}>Home</Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin