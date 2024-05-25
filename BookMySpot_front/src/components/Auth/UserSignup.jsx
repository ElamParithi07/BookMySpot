import React, { useReducer, useState } from 'react'
import { TbBrandAirbnb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from 'react-icons/fc';
import * as Yup from 'yup'
import axios from 'axios'
import  {useNavigate}  from 'react-router-dom';
import { useUserstate } from '../../Context/UserContext';


const initialState = {
    email: '',
    password: '',
    confirmpassword: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload }
        case 'SET_PASSWORD':
            return { ...state, password: action.payload }
        case 'SET_CONFIRM_PASSWORD':
            return { ...state, confirmpassword: action.payload }
        default:
            return state
    }
}

function UserSignup() {
    const { isloggedIn, refreshOtherPages} = useUserstate();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [Errors, setErrors] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    })

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be atleast 8 characters"),
        confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required")
    })

    async function handlesignup(e) {
        e.preventDefault();
        try {
            await validationSchema.validate(state, { abortEarly: false })
            setErrors({});
            console.log('Form submitted:', state.email, state.password);
            try {
                const response = await axios.post('http://localhost:8083/auth/register', { email: state.email, password: state.password });
                if(response.data.status==false){
                    alert(response.data.message)
                    return;
                }
                console.log(response.data.email)
                alert(response.data.message)
                navigate('/login',{state:{email:response.data.email}})
            }
            catch (error) {
                console.log("Axios: ", error.response)
            }
        }
        catch (error) {
            const newErrors = {}

            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setErrors(newErrors)
        }
    }

    if(isloggedIn){
        return (
            <div>you're already logged in</div>
        )
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96 flex flex-col items-center gap-4' >
                <div className='flex flex-col items-center gap-2'>
                    <TbBrandAirbnb className='text-primary text-xl md:text-4xl' />
                    <p className='text-xl md:text-3xl font-bold text-center'>Create an Account</p>
                    <p className='text-xs md:text-base'>Already have an account? <Link className='text-primary' to='/login'>Login</Link></p>
                </div>
                <form className='w-4/5 flex flex-col justify-evenly gap-3 md:w-full' onSubmit={handlesignup}>
                    <input
                        type='text'
                        className='w-full rounded-md p-2 border border-slate-300 focus:outline-slate-400'
                        placeholder='Email address'
                        value={state.email}
                        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    />
                    {Errors.email && <span className='text-red-600 text-xs'>{Errors.email}</span>}
                    <input
                        type='password'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Password'
                        value={state.password}
                        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                    />
                    {Errors.password && <span className='text-red-600 text-xs'>{Errors.password}</span>}
                    <input
                        type='password'
                        className='w-full rounded-md p-2 border border-slate-300'
                        placeholder='Confirm Password'
                        value={state.confirmpassword}
                        onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}
                    />
                    {Errors.confirmpassword && <span className='text-red-600 text-xs'>{Errors.confirmpassword}</span>}
                    <button
                        className='w-full bg-primary h-10 text-white rounded-md'
                        type='submit'
                    >
                        Signup
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

export default UserSignup