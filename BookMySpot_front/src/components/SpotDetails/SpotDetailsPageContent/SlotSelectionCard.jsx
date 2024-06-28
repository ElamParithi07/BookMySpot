import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SlotSelectionCard({ toggleshowslots, data }) {
  const [age, setAge] = useState('');
  const [slots, setSlots] = useState([]);
  const [datelist, setDatalist] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  useEffect(() => {
    const generateDateList = () => {
      const today = new Date();
      const dates = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        dates.push({ day, month, year });
      }
      return dates;
    };

    async function getSlots(){
      try{
        
      }
      catch(error){
        console.log(error)
      }
    }

    setDatalist(generateDateList());
  }, []);


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='h-10/12 md:h-3/5 w-10/12 md:w-3/5 bg-white rounded-xl border'>
        <div className='flex flex-col items-end p-3'>
          <button onClick={() => toggleshowslots()} className='flex items-center'><IoClose className='text-2xl' /></button>
        </div>
        <div>
          <div className='flex border justify-evenly p-3'>
            {datelist.map((date, index) => (
              <div key={index} className='flex flex-col items-center border-t-2 border-t-primary border px-5 py-2 rounded-md '>
                <p className='text-lg'>{`${date.month}`}</p>
                <p className='text-slate-600 text-sm'>{`${date.day}`}</p>
              </div>
            ))}
          </div>
          <div className='p-10 flex items-center justify-center'>
            <p>Available slots will be displayed here...</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-xl font-medium'>Choose your Slot</p>
          </div>
          <div className='flex h-48 items-center justify-evenly'>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 130 }}>
              <InputLabel id="demo-simple-select-standard-label">Start Time</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Start Time"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">End Time</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="End Time"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlotSelectionCard