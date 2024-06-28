import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import axios from 'axios';
import { Bounce, Sentry } from 'react-activity';

function HomePageBody() {
    const [spotList, setSpotList] = useState([]);


    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/spot/getspots`);
                const responseData = response.data
                console.log("data fetched")
                setSpotList(responseData.data)
            } catch (error) {
                console.error(error);
            }
        };
        handleFetchData();
    }, []);
    
    if(spotList.length===0){
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <Sentry className='text-primary' size={25} speed={1} animating={true} />
            </div>
        )
    }

    return (
        <div className='w-full flex flex-wrap justify-start py-6 md:gap-0  md:my-20 '>
            {spotList.map((spot, index) => {
                return (
                    <PlaceCard data={spot}  key={index}/>
                )
            })}
        </div>
    );
}

export default HomePageBody;
