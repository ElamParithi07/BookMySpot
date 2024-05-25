import React from 'react';
import { IoClose } from "react-icons/io5";
import TimeCard from './TimeCard';

function SlotCard({ toggleshowslots, handleslots }) {

    function generateTimeFor24Hours() {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            let formattedHour = hour % 12;
            formattedHour = formattedHour === 0 ? 12 : formattedHour; // Convert 0 to 12 for 12-hour format
            const amPm = hour < 12 ? 'AM' : 'PM'; // Determine whether it's AM or PM
            const timeString = `${formattedHour}:00 ${amPm}`;
            times.push(timeString);
        }
        return times;
    }
    const hours24 = generateTimeFor24Hours();

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='h-10/12 md:h-2/4 w-10/12 md:w-2/4 bg-white rounded-xl border'>
                <div className='flex flex-col items-end'>
                    <button onClick={toggleshowslots} className='p-3'>
                        <IoClose className='text-3xl' />
                    </button>
                </div>
                <div className='p-3 md:p-7'>
                    <p className='text-lg md:text-2xl font-medium mb-5'>Slots</p>
                    <div className='flex flex-wrap gap-4'>
                        {
                            hours24.map((time, index) => {
                                return (
                                    <div key={index}>
                                        <TimeCard time={time} handleslots={handleslots} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlotCard;
