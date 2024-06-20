import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import axios from 'axios';

function HomePageBody() {
    const [spotList, setSpotList] = useState([]);


    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/spot/getspots`);
                const responseData = response.data
                console.log(responseData.data)
                setSpotList(responseData.data)
            } catch (error) {
                console.error(error);
            }
        };
        handleFetchData();
    }, []);

    return (
        <div className='w-full flex flex-wrap justify-start py-6 md:gap-0  md:my-20 '>
            {spotList.map((spot, index) => {
                return (
                    <PlaceCard data={spot}  key={index}/>
                )
            })}
{/* 
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={2} imageurl={"https://imdb.com"} id={1} />
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={3} imageurl={"https://imdb.com"} id={1} />
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={4} imageurl={"https://imdb.com"} id={1} /> */}
        </div>
    );
}

export default HomePageBody;
