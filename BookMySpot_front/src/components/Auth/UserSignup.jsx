import React from 'react'
import { TbBrandAirbnb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";

function UserSignup() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                    <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold text-center'>Create an Account</p>
                    <p className='text-xs md:text-base'>Already have an account? <Link className='text-primary' to='/login'>Login</Link></p>
                </div>
                <form className='w-4/5 flex flex-col justify-evenly gap-5 md:w-full'>
                    <input
                        type='email'
                        className='w-full rounded-md p-2 border border-slate-300 focus:outline-slate-400'
                        placeholder='Email address'
                    />
                    <input
                        type='password'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Password'
                    />
                    <input
                        type='password'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Confirm Password'
                    />
                    <button className='w-full bg-primary h-10 text-white rounded-md'>
                      Signup
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

export default UserSignup