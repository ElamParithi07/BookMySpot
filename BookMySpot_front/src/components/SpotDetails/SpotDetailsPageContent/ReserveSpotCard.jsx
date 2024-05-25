import React from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function ReserveSpotCard({data}) {
    return (
        <div className='hidden w-0 h-4/6 md:flex md:w-4/6 justify-center'>
            <div className='w-96 bg-white flex flex-col shadow-md rounded-xl border border-slate-200 p-5 justify-between gap-3'>
                <div className='flex items-end gap-1'>
                    <p className='font-medium text-xl'>₹{data.feeperhour}</p>
                    <p>/ hr</p>
                </div>
                <div className='border rounded-xl'>
                    <div className='flex'>
                        <div className='w-1/2 p-4 border-r-2'>
                            <p className='font-semibold text-sm overflow-hidden'>Date</p>
                            <input type='date' className='text-sm overflow-hidden'/>
                        </div>
                        <div className='w-1/2 p-4'>
                            <p className='font-semibold text-sm overflow-hidden'>No. of Hours</p>
                            <p className='text-base overflow-hidden'>1</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-4 border-t-2'>
                        <div className='w-full'>
                            <p className='font-semibold text-sm overflow-hidden'>My Slots</p>
                            <select className='text-base overflow-hidden w-full p-3 bg-white scroll-y-auto'>
                                <option value={"1"}>10 AM - 11 AM</option>
                                <option value={"2"}>11 AM - 12 AM</option>
                                <option value={"3"}>12 AM - 1 PM</option>
                                <option value={"4"}>12 AM - 1 PM</option>
                                <option value={"5"}>1 PM - 2 PM</option>
                                <option value={"6"}>2 PM - 3 PM</option>
                                <option value={"7"}>3 PM - 4 PM</option>
                                <option value={"8"}>4 PM - 5 PM</option>
                                <option value={"9"}>5 PM - 6 PM</option>
                                <option value={"10"}>6 PM - 7 PM</option>
                                <option value={"11"}>7 PM - 8 PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='bg-primary w-full h-12 rounded-xl flex items-center justify-center cursor-pointer'>
                    <Link to={`/book/${data._id}`}><p className='text-white'>Reserve</p></Link>
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
    )
}

export default ReserveSpotCard