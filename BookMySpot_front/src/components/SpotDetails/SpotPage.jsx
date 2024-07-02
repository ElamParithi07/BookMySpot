import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SpotImageGrid from './SpotImageGrid';
import { CiExport } from "react-icons/ci";
import SpotDetails from './SpotDetailsPageContent/SpotDetails';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { createnewtoken } from '../RefreshSession/RefreshUser';
import { Bounce, Sentry } from 'react-activity';

function SpotPage() {
  const location = useLocation();
  const { isTrue } = location.state || {};
  const [issaved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    if (location.state && location.state.isTrue !== undefined) {
      setSaved(location.state.isTrue)
    }
    const handleFetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8083/spot/getspotbyid`, { params: { spotid: id } });
        const responseData = response.data;
        setData(responseData.data);
        if (isTrue) {
          setSaved(true)
          console.log("inside saved")
        }
        console.log(responseData)
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchData();

  }, [id,location.state]);

  async function handleSave() {
    try {
      const authtoken = localStorage.getItem('authtoken');
      if (!authtoken) {
        alert("Log in to save the spot");
        return;
      }
      if (issaved) {
        const res = await axios.post("http://localhost:8083/auth/removefromlist",
          {
            spotid: data._id
          },
          {
            headers: {
              'Authorization': `${authtoken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const resData = res.data
        setSaved(false);
        alert("Spot removed from wish list")
        return;
      }
      const response = await axios.post("http://localhost:8083/auth/addtolist",
        {
          spotid: data._id
        },
        {
          headers: {
            'Authorization': `${authtoken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = response.data
      setSaved(true);
      alert("Spot added to wish list")
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        console.log(error.response.data); // response data
        console.log(error.response.status);
        if (error.response.status === 401) {
          console.log('Token expired')
          const email = localStorage.getItem('email')
          await createnewtoken(email)
          await handleSave();
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

  if (Object.keys(data).length === 0) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <Sentry className='text-primary' size={25} speed={1} animating={true} />
      </div>
    );
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
          {issaved ? <button className='flex items-center justify-center gap-1' onClick={() => handleSave()}>
            <AiFillHeart className='text-primary text-lg md:text-2xl' />
            <p className='text-sm md:text-base'>Saved</p>
          </button> :
            <button className='flex items-center justify-center gap-1' onClick={() => handleSave()}>
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
