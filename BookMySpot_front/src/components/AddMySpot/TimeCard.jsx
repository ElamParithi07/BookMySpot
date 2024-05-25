import React, { useState } from 'react';

function TimeCard({ time, handleslots }) {
  const [isSelected, setSelected] = useState(false);

  function handletime (){
    setSelected(!isSelected)
    handleslots(time)
  }

  return (
    <div className={`border rounded-lg p-2 ${isSelected ? 'border-slate-500' : 'border-green-400'} cursor-pointer`} onClick={handletime}>
      <p className={`text-sm ${isSelected ? 'text-slate-500' : 'text-green-400'}`}>{time}</p>
    </div>
  );
}

export default TimeCard;
