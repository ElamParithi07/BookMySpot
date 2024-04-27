import React, { useState } from 'react'
import { TbBrandAirbnb } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function OtpVerification() {
    const [otp, setOtp] = useState("");
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold text-center'>Verify OTP</p>
                    <p className='text-xs md:text-base'>didn't receive otp? <Link className='text-primary' to='/login'>Resend</Link></p>
                </div>
                <div className='w-4/5 flex justify-evenly gap-5 md:w-full'>
                    <input
                        type='text'
                        className='w-full h-12 md:h-16 rounded-md p-4 md:p-8 border border-slate-300 text-lg'
                        maxLength={1}
                    />
                    <input
                        type='text'
                        className='w-full h-12 md:h-16 rounded-md p-4 md:p-8 border border-slate-300 text-lg'
                        maxLength={1}
                    />
                    <input
                        type='text'
                        className='w-full h-12 md:h-16 rounded-md p-4 md:p-8 border border-slate-300 text-lg'
                        maxLength={1}
                    />
                    <input
                        type='text'
                        className='w-full h-12 md:h-16 rounded-md p-4 md:p-8 border border-slate-300 text-lg'
                        maxLength={1}
                    />
                </div>
                <button className='w-4/5 md:w-full bg-primary h-10 text-white rounded-md'>
                    Verify
                </button>
            </div>
        </div>
    )
}

export default OtpVerification