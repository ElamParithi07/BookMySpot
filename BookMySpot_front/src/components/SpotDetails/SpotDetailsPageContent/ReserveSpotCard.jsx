import React from 'react'
import { FaChevronDown } from 'react-icons/fa6'

function ReserveSpotCard() {
    return (
        <div className='hidden w-0 h-4/6 md:flex md:w-4/6 justify-center'>
            <div className='w-96 bg-white flex flex-col shadow-md rounded-xl border border-slate-200 p-5 justify-between gap-3'>
                <div className='flex items-end gap-1'>
                    <p className='font-medium text-xl'>$3,951</p>
                    <p>night</p>
                </div>
                <div className='border rounded-xl'>
                    <div className='flex'>
                        <div className='w-1/2 p-4 border-r-2'>
                            <p className='font-semibold text-sm overflow-hidden'>CHECK-IN</p>
                            <p className='text-xs overflow-hidden'>23/04/2023</p>
                        </div>
                        <div className='w-1/2 p-4'>
                            <p className='font-semibold text-sm overflow-hidden'>CHECKOUT</p>
                            <p className='text-xs overflow-hidden'>25/04/2023</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-4 border-t-2'>
                        <div>
                            <p className='font-semibold text-sm overflow-hidden'>Guests</p>
                            <p className='text-xs overflow-hidden'>1</p>
                        </div>
                        <FaChevronDown />
                    </div>
                </div>
                <div className='bg-primary w-full h-12 rounded-xl flex items-center justify-center cursor-pointer'>
                    <p className='text-white'>Reserve</p>
                </div>
                <div className='text-center'>
                    <p className='text-sm'>You won't be charged yet</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <p className='underline'>₹14,834 x 5 nights</p>
                        <p>₹74,171</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='underline'>Airbnb service fee</p>
                        <p>₹12,164</p>
                    </div>
                </div>
                <div className='h-px w-full bg-slate-300 my-7 rounded'></div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <p className='font-medium'>Total before taxes</p>
                        <p className='font-medium'>₹86,335</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReserveSpotCard