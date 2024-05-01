import React, { useEffect, useState } from 'react'
import { TbBrandAirbnb } from 'react-icons/tb'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';


function UserLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ispasshow, setpasshow] = useState(false)
    const [Errors, setErrors] = useState({
        email: "",
        password: ""
    })


    useEffect(() => {
        if (location.state) {
            setEmail(location.state.email);
        }
    }, [])

    const handleOtp = async (e) => {
        e.preventDefault();
        try {
            if (ispasshow) {
                const newErrors = {}
                if (!email) {
                    newErrors[email] = "Email is required"
                }
                if (!password) {
                    newErrors[password] = "Password is required"
                    setErrors(newErrors)
                    return;
                }
                if (password.length < 6) {
                    newErrors[password] = "Password must be atleast 6 characters"
                    setErrors(newErrors)
                }
            }
            else {
                if (!email) {
                    setErrors({ email: "Email is required" })
                    return;
                }
            }
            const validres = await axios.post('http://localhost:8081/auth/verifyemail', { email })
            if (validres.data.status == false) {
                setErrors({ email: validres.data.message })
                return;
            }
            setErrors({})
            const otpresponse = await axios.post('http://localhost:8081/auth/sendotp', { email, password })
            if (otpresponse.data.status == false) {
                alert(otpresponse.data.message)
                setpasshow(true)
                return;
            }
            navigate('/otpauth', { state: { email } })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                    <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold'>Login to your Account</p>
                    <p className='text-xs md:text-base'>Don't have an account yet? <Link className='text-primary' to='/signup'>Signup</Link></p>
                </div>
                <form className='w-4/5 h-52 flex flex-col justify-evenly md:w-full' onSubmit={handleOtp}>
                    <input
                        type='text'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {Errors.email && <span className='text-red-600 text-xs'>{Errors.email}</span>}
                    {ispasshow &&
                        <div className=' my-3'>
                            <button className='text-xs text-slate-600'>If you've an account, ignore password</button>
                            <input
                                type='text'
                                className='w-full rounded-md p-2 border border-slate-300'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    }
                    {Errors.password && <span className='text-red-600 text-xs'>{Errors.password}</span>}
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                className='text-xs md:text-sm'
                            />
                            <p className='text-xs md:text-sm'>Remember me</p>
                        </div>
                        <button className='text-primary text-xs md:text-sm'>Forgot your password?</button>
                    </div>
                    <button
                        className='w-full bg-primary h-10 text-white rounded-md'
                        type='submit'
                    >
                        Send OTP
                    </button>
                </form>
                <div className='w-full flex flex-col items-center gap-2'>
                    <p>or</p>
                    <div className='w-4/5 md:w-full border border-black h-10 rounded-lg flex items-center justify-center gap-2'>
                        <p>Continue with</p>
                        <FcGoogle />
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                    <FiArrowLeft />
                    <Link to={'/'}>Home</Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin