import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import axios from 'axios';

function HomePageBody() {
    const [spotList, setSpotList] = useState([]);

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const response = await axios.get(`https://dummyapi.online/api/movies`);
                setSpotList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        handleFetchData();
    }, []);

    return (
        <div className='w-full flex flex-wrap justify-start py-6 md:gap-0  md:my-20 '>
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={1} imageurl={"https://imdb.com"} id={1} />
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={1} imageurl={"https://imdb.com"} id={1} />
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={1} imageurl={"https://imdb.com"} id={1} />
            <PlaceCard name={"Alex Hormozi"} rating={"4.7"} key={1} imageurl={"https://imdb.com"} id={1} />
        </div>
    );
}

export default HomePageBody;
