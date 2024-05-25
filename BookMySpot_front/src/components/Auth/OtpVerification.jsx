import React, { useEffect, useRef, useState } from 'react';
import { TbBrandAirbnb } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useUserstate } from '../../Context/UserContext';


function OtpVerification() {
    const { isloggedIn, refreshOtherPages } = useUserstate();
    const navigate = useNavigate()
    const location = useLocation();
    const [email, setEmail] = useState("")
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
        if (value === "") {
            // If the input is empty, do nothing
        } else if (value.length === 1 && index < inputRefs.length - 1) {
            // Focus on the next input field if a digit is entered
            inputRefs[index + 1].current.focus();
        }
    };

    const handleBackspace = (index, event) => {
        if (event.key === 'Backspace' && !event.target.value) {
            event.preventDefault();
            if (index > 0 && inputRefs[index - 1].current) {
                inputRefs[index - 1].current.focus();
                // Delete the number in the previous input field
                inputRefs[index - 1].current.value = "";
            }
        }
    };


    const handleLogin = async () => {
        let otp = '';
        for (let i = 0; i < inputRefs.length; i++) {
            // Check if ref is not null before accessing current property
            if (inputRefs[i].current) {
                otp += inputRefs[i].current.value;
            } else {
                // Handle the case where ref is null (optional)
                console.error(`Ref at index ${i} is null`);
            }
        }
        if(otp.length !== 6){
            alert("Enter Full OTP")
            return;
        }
        try{
            const response = await axios.post('http://localhost:8083/auth/verifyotp',{email,otp})
            const responseData = response.data
            console.log(responseData)
            if(responseData.status === false){
                alert(responseData.message)
                return;
            }
            localStorage.setItem('email',email)
            localStorage.setItem('authtoken',responseData.authtoken)
            if(responseData.msatoken){
                localStorage.setItem('msaToken', responseData.msatoken)
            }
            localStorage.setItem('refreshToken', responseData.refreshToken)
            alert(responseData.message)
            refreshOtherPages();
            navigate('/');
        }
        catch(error){
            console.log(error)
        }
    };
    

    if (isloggedIn) {
        console.log("inside log")
        return (
            <div>You're already logged in</div>
        )
    }


    useEffect(() => {
        inputRefs[0].current.focus();
        if (location.state) {
            setEmail(location.state.email)
        }
    }, [])

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
                            onChange={(e) => handleInput(index, e)}
                            onKeyDown={(e) => handleBackspace(index, e)}
                        />
                    ))}
                </div>
                <button className='w-4/5 md:w-full bg-primary h-10 text-white rounded-md' onClick={handleLogin}>
                    Verify
                </button>
            </div>
        </div>
    );
}

export default OtpVerification;
