import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import ConfirmBookingCard from './ConfirmBookingCard';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';


function SpotBookingpage() {
    const navigate = useNavigate();
    const [isloggedin, setLoggedin] = useState(false);
    return (
        <div className='mx-5 md:mx-48 md:mt-11 flex flex-col md:flex-row gap-7'>
            <div className='md:w-1/2'>
                <div className='flex gap-4 items-center md:mb-10'>
                    <button><MdKeyboardArrowLeft className='text-2xl' /></button>
                    <p className='text-xl md:text-3xl font-medium'>Confirm and Book</p>
                </div>
                <div className='flex flex-col my-10 md:mx-14 gap-5 md:gap-10 '>
                    <div>
                        <p className='text-xl font-medium'>Your Slot</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p>Date</p>
                            <p>18/04/2004</p>
                        </div>
                        <p className='font-medium underline'>Edit</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p>No. of Hours</p>
                            <p>3</p>
                        </div>
                        <p className='font-medium underline'>Edit</p>
                    </div>
                </div>
                <div className='h-px bg-slate-300 my-7 rounded'></div>
                {
                    isloggedin ?
                        <div>
                            <div className='bg-primary w-full h-12 rounded-xl flex items-center justify-center cursor-pointer'>
                                <Link to={'/book'}><p className='text-white'>Pay advance and Book</p></Link>
                            </div>
                        </div> :
                        <div className='flex flex-col gap-5'>
                            <p className='text-2xl font-medium'>Log in or sign up to book</p>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-full border border-black h-14 rounded-lg flex items-center justify-center gap-2'>
                                    <p>Sign in with</p>
                                    <FcGoogle />
                                </div>
                                <p>or</p>
                                <div className='w-full border border-black h-14 rounded-lg flex items-center justify-center gap-2'>
                                    <MdOutlineMail />
                                    <p>Continue with email</p>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className='w-1/2 flex justify-center'>
                <ConfirmBookingCard />
            </div>
        </div>
    )
}

export default SpotBookingpage