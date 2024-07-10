import React from 'react'
import { useLocation } from 'react-router'

function History() {
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-full md:w-3/4 py-9'>
                <div className='flex justify-between border-l-2 border-primary px-4'>
                    <p className='text-xl md:text-3xl font-medium'>History</p>
                </div>
                <div className='flex flex-col'>
                    {
                        data.length!=0 ? data.map(()=>{
                            return (
                                <p>Hi</p>
                            )
                        }):
                        <p className='text-center py-10 text-sm text-slate-500'>No spots were booked!</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default History