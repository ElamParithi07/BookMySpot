import React, { useEffect, useState } from 'react'
import PlaceCard from './PlaceCard'
import axios from 'axios';



function HomePageBody() {
    const [spotList, setSpotList] = useState([]);

    useEffect(()=>{
        const handleFetchData= async()=>{
            try {
                const response = await axios.get(`https://dummyapi.online/api/movies`);
                console.log(response.data);
                setSpotList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        handleFetchData()
    },[]);
    return (
        <div className='w-full flex flex-wrap justify-start py-6 md:gap-0'>
            {spotList?.map((item)=>{
                return <PlaceCard name ={item.movie} rating ={item.rating} key={item.id} imageurl={item.imdb_url}/>
            })}
        </div>
    )
}

export default HomePageBody