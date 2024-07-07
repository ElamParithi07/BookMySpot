import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotSelectionCard from './SlotSelectionCard';

function ReserveSpotCard({ data }) {
  const [isShowslots, setShowslots] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  function toggleshowslots() {
    setShowslots(!isShowslots);
  }

  const handleSlotSelection = (date, start, end) => {
    setSelectedDate(date);
    setStartTime(start);
    setEndTime(end);
  };

  const handleReserveClick = () => {
    if (!selectedDate || !startTime || !endTime) {
      alert('Please select a date, start time, and end time.');
      return;
    }
    navigate(`/book/${data._id}`, {
      state: {
        spotId: data._id,
        selectedDate,
        startTime,
        endTime,
      },
    });
  };

  return (
    <div className='hidden w-0 h-4/6 md:flex md:w-4/6 justify-center'>
      {isShowslots && (
        <SlotSelectionCard
          toggleshowslots={toggleshowslots}
          data={data}
          onSlotSelection={handleSlotSelection}
        />
      )}
      <div className='w-96 bg-white flex flex-col shadow-md rounded-xl border border-slate-200 p-5 justify-between gap-3'>
        <div className='flex items-end gap-1'>
          <p className='font-medium text-xl'>₹{data.feeperhour}</p>
          <p>/ hr</p>
        </div>
        <div className='border rounded-xl'>
          <div className='flex justify-center items-center p-4'>
            <button onClick={() => toggleshowslots()}>Choose your Slot</button>
          </div>
        </div>
        <div
          className='bg-primary w-full h-12 rounded-xl flex items-center justify-center cursor-pointer'
          onClick={handleReserveClick}
        >
          <p className='text-white'>Reserve</p>
        </div>
        <div className='text-center'>
          <p className='text-sm'>You won't be charged yet</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <p className='underline'>₹{data.feeperhour} x 1 hours</p>
            <p>₹1000</p>
          </div>
          <div className='flex justify-between'>
            <p className='underline'>BookMySpot service fee</p>
            <p>₹0</p>
          </div>
        </div>
        <div className='h-px w-full bg-slate-300 my-7 rounded'></div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <p className='font-medium'>Total</p>
            <p className='font-medium'>₹1000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveSpotCard;
