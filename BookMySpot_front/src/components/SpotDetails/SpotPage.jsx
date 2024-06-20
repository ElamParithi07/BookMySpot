import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SpotImageGrid from './SpotImageGrid';
import { CiExport } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoMdStar } from 'react-icons/io';
import { PiDoorOpen } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { GrKey } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa6";
import SpotDetails from './SpotDetailsPageContent/SpotDetails';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { createnewtoken } from '../RefreshSession/RefreshUser';

function SpotPage() {
    const [issaved, setSaved] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState({});
    console.log(id)

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/spot/getspotbyid`, { spotid: id });
                const responseData = response.data
                setData(responseData.data)
            } catch (error) {
                console.error(error);
            }
        }
        handleFetchData()
    }, []);

    async function handlewishlist(){
        try{
            const response = await axios.post('http://localhost:8083/auth/addtolist',{ spotid: id})
            const responseData = response.data
            
        }
        catch(error){
            console.log(error.message)
            if (error.response) {
                console.log(error.response.data); // response data
                console.log(error.response.status); 
                if (error.response.status === 401) {
                    console.log('Token expired')
                    await createnewtoken(email)
                    await handlewishlist();
                } else if (error.response.status === 400) {
                    alert('Invalid Auth Token');
                } else {
                    console.log('Unexpected Error:', error.response.data);
                }
            } else if (error.request) {
                console.log(error.request);
                alert('No response from the server');
            } else {
                console.log('Error:', error.message);
                alert('Error:', error.message);
            }
        }
    }

    return (
        <div className='mx-7 md:mx-40 min-h-fit flex flex-col md:py-10 gap-5'>
            <div className='flex flex-col md:flex-row justify-between gap-2'>
                <div className='flex gap-3'>
                    <button onClick={() => navigate(-1)}><MdKeyboardArrowLeft className='text-2xl md:text-3xl' /></button>
                    <p className='text-lg md:text-2xl font-medium'>{data.name}</p>
                </div>
                <div className='flex gap-5'>
                    <div className='flex items-center justify-center gap-1'>
                        <CiExport className='text-lg md:text-2xl' />
                        <p className='text-sm md:text-base'>Share</p>
                    </div>
                    {issaved ? <button className='flex items-center justify-center gap-1' onClick={()=>handlewishlist()}>
                        <AiFillHeart className='text-primary text-lg md:text-2xl' />
                        <p className='text-sm md:text-base'>Saved!</p>
                    </button> :
                        <button className='flex items-center justify-center gap-1' onClick={()=>handlewishlist()}>
                            <AiOutlineHeart className='text-lg md:text-2xl' />
                            <p className='text-sm md:text-base'>Save</p>
                        </button>
                    }
                </div>
            </div>
            <SpotImageGrid />
            <SpotDetails data={data} />
            <div className="flex fixed bottom-0 w-full h-16 bg-white border-t justify-between items-center md:hidden">
                <div className='flex flex-col h-full justify-center'>
                    <p className='text-base font-semibold'>
                        ₹{data.feeperhour} / hr
                    </p>
                    <p className='text-xs'>
                        You won't be charged yet
                    </p>
                </div>
                <div className='bg-primary w-36 h-3/5 py-5 mr-10 rounded-xl flex items-center justify-center cursor-pointer'>
                    <Link to={{
                        pathname: `/book/${data._id}`,
                        state: { spotId: data._id } // Pass data via state
                    }}><p className='text-white'>Reserve</p></Link>
                </div>
            </div>
        </div>
    );
}

export default SpotPage;
