import React, { useEffect, useReducer, useState } from 'react'
import { ImLocation } from "react-icons/im";
import SlotCard from './SlotCard';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce } from "react-activity";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import SpotDashboard from './SpotDashboard/SpotDashboard';

const initialState = {
  name: '',
  about: '',
  location: '',
  feeperhour: '',
  phonenumber: '',
  gmaplink: '',
  slots: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_ABOUT':
      return { ...state, about: action.payload }
    case 'SET_LOCATION':
      return { ...state, location: action.payload }
    case 'SET_FEE':
      return { ...state, feeperhour: action.payload }
    case 'SET_PHONE':
      return { ...state, phonenumber: action.payload }
    case 'SET_GMAPLINK':
      return { ...state, gmaplink: action.payload }
    case 'SET_SLOTS':
      return { ...state, slots: action.payload }
    default:
      return state
  }
}

function MySpot() {
  const navigate = useNavigate();
  const [isShowslots, setShowslots] = useState(false)
  const [tempslot, setTempslot] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState);
  const [indicator, setIndicator] = useState(false);
  const [havespot, sethavespot] = useState(false);
  const [isform , setform] = useState(true)
  const [Errors, setErrors] = useState({
    name: '',
    about: '',
    location: '',
    feeperhour: '',
    phonenumber: '',
    slots: ''
  })

  useEffect(()=>{
    const data = localStorage.getItem('msaToken')
    if(data){
      sethavespot(true)
    }
  },[])

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    location: Yup.string().required("Location is required"),
    feeperhour: Yup.string().required("this field is required"),
    phonenumber: Yup.string().required("phone number is required"),
    gmaplink: Yup.string(),
    slots: Yup.array().required("select your slots").min(1, "Select your Slots, it should not empty")
  })

  async function handleAddspot(e) {
    e.preventDefault();
    console.log(tempslot)
    dispatch({ type: 'SET_SLOTS', payload: [tempslot] })
    try {
      await validationSchema.validate(state, { abortEarly: false })
      setErrors({});
      console.log(state)
      console.log("form submitted")
      const authtoken = localStorage.getItem('authtoken');
      console.log(authtoken)
      setIndicator(true)
      const response = await axios.post('http://localhost:8083/spot/addspot', 
        {name:state.name, about:state.about, location:state.location, phonenumber: state.phonenumber, feeperhour: state.feeperhour, gmaplink: state.gmaplink, slots: tempslot}
      , {
        headers: {
          'content-type':'application/json',
          'Authorization': `Bearer ${authtoken}`
        }
      });
      const responseData = response.data
      console.log(responseData)
      setIndicator(false)
      const spottoken = localStorage.setItem('msatoken', responseData.msatoken)
      alert(responseData.message)
      navigate('/profile')
    }
    catch (error) {
      setIndicator(false)
      if (error.inner) {
        const newErrors = {}

        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        })
        setErrors(newErrors)
      }
      console.log(error)
      if(error.response.status==409){
        alert(error.response.data.message)
      }
    }
  }

  function toggleshowslots() {
    setShowslots(!isShowslots)
  }

  function handleslots(time) {
    if (tempslot.includes(time)) {
      const updatedSlots = tempslot.filter(slot => slot !== time);
      setTempslot(updatedSlots);
    } else {
      setTempslot([...tempslot, time]);
    }
  }

  if(havespot){
    return (
      <>
      <SpotDashboard/>
      </>
    )
  }


  return (
    <div className='h-full w- full'>
      {
        isShowslots && <SlotCard toggleshowslots={toggleshowslots} handleslots={handleslots} />
      }
      <div className='h-10 md:h-20 flex justify-center items-center gap-2'>
        <ImLocation className='text-primary text-2xl' />
        <p className='text-2xl font-medium'>Add My Spot</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex w-0 h-full md:w-1/2 items-center justify-center'>
          <img
            src={'https://img.freepik.com/free-vector/woman-looking-map-local-tourism-concept_23-2148589669.jpg?t=st=1715691531~exp=1715695131~hmac=55ed94bea12f33f375823fe38a08683466242ccf6c8e8e4af5733c795816fdd3&w=1060'}
            className='h-96 w-96 mt-20'
          />
        </div>
        <div className='w-full h-full md:w-1/2'>
          {isform ?<div className='p-10 flex flex-col gap-2'>

            <label className='text-base'>Name of your Spot</label><br></br>
            <input
              type='text'
              placeholder='Enter name'
              className='p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.name}
              onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            />
            {Errors.name && <span className='text-red-600 text-xs'>{Errors.name}</span>}


            <label className='text-base'>About</label><br></br>
            <textarea
              type='text'
              placeholder='Describe about your spot'
              className='h-28 p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.about}
              onChange={(e) => dispatch({ type: 'SET_ABOUT', payload: e.target.value })}
            />
            {Errors.about && <span className='text-red-600 text-xs'>{Errors.about}</span>}


            <label className='text-base'>Location</label><br></br>
            <input
              type='text'
              placeholder='Enter location'
              className='p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.location}
              onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target.value })}
            />
            {Errors.location && <span className='text-red-600 text-xs'>{Errors.location}</span>}

            <button
              className='flex items-center justify-center gap-2 bg-primary h-11 text-white rounded-md w-full md:w-3/4 my-4'
              onClick={() => setform(false)}
            >
              Next <FaArrowRight/>
            </button>
            
          </div>:
          <div className='p-10 flex flex-col gap-2'>
            
            <div className='flex flex-col items-end  md:w-3/4'>
              <button onClick={()=>setform(true)} className='flex items-center gap-2 float-right text-primary'><FaArrowLeft className='text-lg'/>Back</button>
            </div>

            <label className='text-base'>Fee per hour</label><br></br>
            <input
              type='text'
              placeholder='Enter fee per hour in Rs.'
              className='p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.feeperhour}
              onChange={(e) => dispatch({ type: 'SET_FEE', payload: e.target.value })}
            />
            {Errors.feeperhour && <span className='text-red-600 text-xs'>{Errors.feeperhour}</span>}


            <label className='text-base'>Phone</label><br></br>
            <input
              type='text'
              placeholder='Enter Phone number'
              className='p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.phone}
              onChange={(e) => dispatch({ type: 'SET_PHONE', payload: e.target.value })}
            />
            {Errors.phonenumber && <span className='text-red-600 text-xs'>{Errors.phonenumber}</span>}


            <label className='text-base'>Google Map Link</label><br></br>
            <input
              type='text'
              placeholder='Enter google map link'
              className='p-3 border border-slate-300 rounded-lg w-full md:w-3/4'
              value={state.gmaplink}
              onChange={(e) => dispatch({ type: 'SET_GMAPLINK', payload: e.target.value })}
            />


            <label className='text-base'>Select Slots</label><br></br>
            <button className='border border-green-500 text-green-500 w-full md:w-3/4 rounded-md p-2' onClick={() => toggleshowslots()}>View Slots</button>
            {Errors.slots && <span className='text-red-600 text-xs'>{Errors.slots}</span>}

            {indicator?<button
              className=' bg-primary h-11 text-white rounded-md w-full md:w-3/4'
            >
              <Bounce color="#ffff" size={12} speed={1} animating={true} />
            </button>:<button
              className=' bg-primary h-11 text-white rounded-md w-full md:w-3/4'
              onClick={(e) => handleAddspot(e)}
            >
              Create My Spot
            </button>}
          </div>
            }
        </div>
      </div>
    </div>
  )
}

export default MySpot