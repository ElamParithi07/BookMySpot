import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SpotImageGrid from './SpotImageGrid';
import { CiExport } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

function SpotPage() {
    const { id } = useParams();
    const [data, setData] = useState({});
    console.log(id)

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const response = await axios.get(`https://dummyapi.online/api/movies/${id}`);
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        handleFetchData()
    }, []);

    return (
        <div className='mx-7 md:mx-40 md:my-20 flex flex-col h-screen md:py-8 gap-5 mt-28'>
            <div className='flex flex-col md:flex-row justify-between'>
                <p className='text-lg md:text-2xl font-medium'>{data.movie}</p>
                <div className='flex gap-5'>
                    <div className='flex items-center justify-center gap-1'>
                        <CiExport  className='text-lg md:text-2xl'/>
                        <p className='text-sm md:text-base'>Share</p>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                        <CiHeart  className='text-lg md:text-2xl'/>
                        <p className='text-sm md:text-base'>Save</p>
                    </div>
                </div>
            </div>
            <SpotImageGrid />
            
        </div>
    );
}

export default SpotPage;
