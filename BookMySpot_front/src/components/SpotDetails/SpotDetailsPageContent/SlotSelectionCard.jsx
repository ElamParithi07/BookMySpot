import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SlotSelectionCard({ toggleshowslots, data, onSlotSelection }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slots, setSlots] = useState([]);
  const [datelist, setDatalist] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    setEndTime('');
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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

    const generateTimeSlots = () => {
      const times = [];
      const now = new Date();
      const currentHour = now.getHours();
      for (let i = currentHour; i < 24; i++) {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        times.push(`${hour}:00 ${period}`);
      }
      return times;
    };

    const dates = generateDateList();
    const times = generateTimeSlots();
    setDatalist(dates);
    setSlots(times);
    setStartTime(times[0]);  // set the first available time slot as the default start time
  }, []);

  const getEndTimeOptions = () => {
    const startIndex = slots.indexOf(startTime);
    return slots.slice(startIndex + 1);
  };

  const handleSave = () => {
    if (selectedDate && startTime && endTime) {
      onSlotSelection(selectedDate, startTime, endTime);
      toggleshowslots();
    } else {
      alert('Please select a date, start time, and end time.');
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='h-10/12 md:h-3/5 w-10/12 md:w-3/5 bg-white rounded-xl border'>
        <div className='flex flex-col items-end p-3'>
          <button onClick={() => toggleshowslots()} className='flex items-center'><IoClose className='text-2xl' /></button>
        </div>
        <div>
          <div className="overflow-x-auto p-3">
            <div className="flex space-x-4 md:justify-center md:gap-4">
              {datelist.map((date, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center border-t-2 border-t-primary border px-3 md:px-5 md:py-2 rounded-md hover:bg-gray-200 ${selectedDate === date ? 'bg-gray-200' : ''}`}
                  onClick={() => handleDateChange(date)}
                >
                  <p className="text-lg">{date.month}</p>
                  <p className="text-slate-600 text-sm">{date.day}</p>
                </button>
              ))}
            </div>
          </div>
          <div className='p-10 flex items-center justify-center'>
            <p className='text-sm md:text-base text-center'>Available slots will be displayed here...</p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-base md:text-xl font-medium'>Choose your Slot</p>
          </div>
          <div className="flex flex-col md:flex-row md:h-38 items-center justify-evenly p-4 space-y-4 md:space-y-0 md:space-x-4">
            <FormControl variant="standard" className="w-3/5 md:w-1/5">
              <InputLabel id="start-time-select-label">Start Time</InputLabel>
              <Select
                labelId="start-time-select-label"
                id="start-time-select"
                value={startTime}
                onChange={handleStartTimeChange}
                label="Start Time"
              >
                {slots.map((time, index) => (
                  <MenuItem key={index} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" className="w-3/5 md:w-1/5">
              <InputLabel id="end-time-select-label">End Time</InputLabel>
              <Select
                labelId="end-time-select-label"
                id="end-time-select"
                value={endTime}
                onChange={handleEndTimeChange}
                label="End Time"
                disabled={!startTime}
              >
                {getEndTimeOptions().map((time, index) => (
                  <MenuItem key={index} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='flex items-center justify-center py-2'>
            <button className='bg-primary text-white rounded-md px-4 py-2' onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotSelectionCard;
