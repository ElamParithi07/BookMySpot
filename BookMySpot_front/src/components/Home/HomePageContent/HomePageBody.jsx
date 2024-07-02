import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';
import axios from 'axios';
import { Bounce, Sentry } from 'react-activity';
import { createnewtoken } from '../../RefreshSession/RefreshUser';

function HomePageBody() {
    const [spotList, setSpotList] = useState([]);
    const [ user, setUser] = useState([]);
    const [indicator, setIndicator] = useState(false);


    useEffect(() => {
        const handleFetchData = async () => {
            try {
                setIndicator(true)
                const response = await axios.get(`http://localhost:8083/spot/getspots`);
                const responseData = response.data
                console.log("data fetched")
                setSpotList(responseData.data)
                setIndicator(false)
            } catch (error) {
                console.error(error);
            }
        };
        handleFetchData();
        fetchUser();
    }, []);
    

  const fetchUser = async () => {
    try {
      const authtoken = localStorage.getItem('authtoken');
      if (!authtoken) {
        return;
      }
      const response = await axios.get("http://localhost:8083/auth/getuser", {
        headers: {
          'Authorization': `${authtoken}`,
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data;
      setUser(responseData.data);
      console.log(responseData.data)
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        console.log(error.response.data); // response data
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log('Token expired');
          const email = localStorage.getItem('email')
          await createnewtoken(email);
          await fetchUser();
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
  };

    if(spotList.length===0){
        return (
            <div className='h-96 w-full flex justify-center items-center'>
                <p>No data found.</p>
            </div>
        )
    }


    return (
        <div className='w-full flex flex-wrap justify-start py-6 md:gap-0  md:my-20 '>
          {indicator && <Sentry className='text-primary' size={25} speed={1} animating={true} />}
            {spotList.map((spot, index) => {
                return (
                    <PlaceCard data={spot}  key={index} saved = {user}/>
                )
            })}
        </div>
    );
}

export default HomePageBody;
