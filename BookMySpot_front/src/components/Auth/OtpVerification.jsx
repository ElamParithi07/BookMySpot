import React, { useEffect, useRef, useState } from 'react';
import { TbBrandAirbnb } from 'react-icons/tb';
import { Link } from 'react-router-dom';

function OtpVerification() {
    const [otp, setOtp] = useState("");
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const handleInput = (index, event) => {
        const value = event.target.value;
        let newOtp = otp;
        if (value === "") {
            // If the input is empty, do nothing
            // Delete the digit from the OTP
            newOtp = newOtp.slice(0, index) + newOtp.slice(index + 1);
        } else {
            // Update the OTP with the entered digit
            newOtp = newOtp.slice(0, index) + value + newOtp.slice(index + 1);
            // Focus on the next input field if a digit is entered
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
        setOtp(newOtp);
    };

    useEffect(() => {
        inputRefs[0].current.focus();
    }, []);

    const sendOtp =()=>{
        console.log(otp)
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                    <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold text-center'>Verify OTP</p>
                    <p className='text-xs md:text-base'>Didn't receive OTP? <Link className='text-primary' to='/login'>Resend</Link></p>
                </div>
                <div className='w-4/5 flex justify-evenly gap-5 md:w-full'>
                    {inputRefs.map((inputRef, index) => (
                        <input
                            key={index}
                            type='text'
                            className='w-full md:w-4/5 h-10 md:h-14 rounded-md p-2 md:p-4 border border-slate-300 text-lg focus:outline-none'
                            maxLength={1}
                            ref={inputRef}
                            value={otp[index] || ''}
                            onChange={(e) => handleInput(index, e)}
                        />
                    ))}
                </div>
                <button className='w-4/5 md:w-full bg-primary h-10 text-white rounded-md' onClick={sendOtp}>
                    Verify
                </button>
            </div>
        </div>
    );
}

export default OtpVerification;
