import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import ConfirmBookingCard from './ConfirmBookingCard';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useUserstate } from '../../../Context/UserContext';
import axios from 'axios';
import { Bounce } from "react-activity";
import { createnewtoken } from '../../RefreshSession/RefreshUser';

function SpotBookingpage() {
    const { id } = useParams();
    const location = useLocation();
    const { selectedDate, startTime, endTime } = location.state || {};
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [indicator, setIndicator] = useState(false);
    const { isloggedIn } = useUserstate();
    const email = localStorage.getItem('email');
    let authtoken = localStorage.getItem('authtoken');
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8083/spot/getspotbyid`, { params: { spotid: id } });
                const responseData = response.data;
                setData(responseData.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        fetchData();
    }, [id]);

    async function handleBook() {
        try {
            setIndicator(true);
            authtoken = localStorage.getItem('authtoken');
            const response = await axios.post('http://localhost:8083/book/bookspot', { bookedto: id, hours: 2 }, {
                headers: {
                    'Authorization': `Bearer ${authtoken}`,
                    'content-type': 'application/json'
                }
            });
            const responseData = response.data;
            setIndicator(false);
            alert(responseData.message);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                console.log(error.response.data); // response data
                console.log(error.response.status); 
                if (error.response.status === 401) {
                    console.log('Token expired');
                    await createnewtoken(email);
                    await handleBook();
                } else if (error.response.status === 400) {
                    alert('Invalid Auth Token');
                } else {
                    alert( error.response.data.message);
                }
            } else if (error.request) {
                console.log(error.request);
                alert('No response from the server');
            } else {
                console.log('Error:', error.message);
                alert('Error:', error.message);
            }
            setIndicator(false);
        }
    }

    return (
        <div className='mx-5 h-full md:mx-48 md:mt-11 flex flex-col md:flex-row gap-7'>
            <div className='md:w-1/2'>
                <div className='flex gap-4 items-center md:mb-10'>
                    <button onClick={() => navigate(-1)}><MdKeyboardArrowLeft className='text-2xl' /></button>
                    <p className='text-xl md:text-3xl font-medium'>Confirm and Book</p>
                </div>
                <div className='flex flex-col my-10 md:mx-14 gap-5 md:gap-10 '>
                    <div>
                        <p className='text-xl font-medium'>Your Slot</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p>Date</p>
                            <p>{selectedDate ? `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}` : 'N/A'}</p>
                        </div>
                        <p className='font-medium underline cursor-pointer' onClick={() => navigate(-1)}>Edit</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p>Slot time</p>
                            <p>{startTime && endTime ? `${startTime} - ${endTime}` : 'N/A'}</p>
                        </div>
                        <p className='font-medium underline cursor-pointer' onClick={() => navigate(-1)}>Edit</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <p>No. of Hours</p>
                            <p>1</p>
                        </div>
                        <p className='font-medium underline cursor-pointer' onClick={() => navigate(-1)}>Edit</p>
                    </div>
                </div>
                <div className='h-px bg-slate-300 my-5 rounded'></div>
                <div className='flex w-full  h-fit items-center my-3 justify-center md:hidden'>
                    <ConfirmBookingCard data={data} />
                </div>
                {
                    isloggedIn ?
                        <div>
                            <div className='bg-primary w-full h-12 rounded-xl flex items-center justify-center my-2 cursor-pointer'>
                                {!indicator ?
                                    <button onClick={handleBook}><p className='text-white'> Book Now </p></button> :
                                    <button><Bounce color="#ffff" size={12} speed={1} animating={true} /></button>
                                }
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
                                    <Link to={'/login'}>Continue with email</Link>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className='hidden md:w-1/2 md:flex justify-center'>
                <ConfirmBookingCard data={data} />
            </div>
        </div>
    );
}

export default SpotBookingpage;
