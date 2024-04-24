import React from 'react'
import { FaChevronDown } from 'react-icons/fa6';
import { GrKey } from 'react-icons/gr';
import { IoMdStar } from 'react-icons/io'
import { PiDoorOpen } from 'react-icons/pi';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineCleanHands } from "react-icons/md";

function SpotDetails() {
    const imageUrl = 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';

    return (
        <div className='w-full min-h-full mt-3'>
            <div className='flex w-full h-screen'>
                <div className='flex flex-col h-full w-full md:w-4/5'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-base md:text-xl font-medium'>Private room in nature lodge in India</p>
                        <ul className='flex flex-wrap gap-2 md:gap-4'>
                            <li className="placecardtext flex items-center">
                                <span className="mr-1">16+ guests</span>
                            </li>
                            <li className="placecardtext flex items-center">
                                <span className="mr-1">6 bedrooms</span>
                            </li>
                            <li className="placecardtext flex items-center">
                                <span className="mr-1">12 beds</span>
                            </li>
                            <li className="placecardtext flex items-center">
                                <span className="mr-1">6.5 bathrooms</span>
                            </li>
                        </ul>
                        <div className='flex items-center gap-3'>
                            <div className='flex gap-1 items-center'>
                                <IoMdStar className='placecardtext' />
                                <p className='placecardtext'>4.75</p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <p className='placecardtext'>16</p>
                                <p className='placecardtext underline'>Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='flex items-center gap-6'>
                        <img className='h-8 w-8 rounded-full' src={imageUrl} />
                        <div>
                            <p className='text-sm md:text-base'>Hosted by Bopanna & Nirala</p>
                            <p className='text-xs md:text-sm text-slate-400'>5 Years Hosting</p>
                        </div>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='w-full p-4'>
                        <ul className='flex flex-col gap-5'>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <PiDoorOpen className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Self Check-in</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>You can check in with the building staff.</p>
                                </div>
                            </li>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <SlLocationPin className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Great Location</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </li>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <GrKey className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Great check-in experience</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>93% of recent guests gave the check-in process a 5-star rating.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='w-full p-3 flex flex-col gap-3 items-start'>
                        <p className='font-medium text-base md:text-lg'>About the Place</p>
                        <p className='text-slate-800 text-sm md:text-base w-4/5'>Vanandhaara is a beautiful Villa & HomeStay in Coorg located on our Coffee plantation and a just few minutes from the famous Nagarahole Tiger Reserve,  Kabini, Brahmagiri hills, Irpu falls & other attractions.
                            We offer 6 exquisitely designed large & clean rooms, each with a private balcony and private bathroom. Individual room's or the Entire villa can be reserved by guests.
                            For eg...
                            <button className='underline p-2 bg-slate-100 rounded-lg'>Show more</button>
                        </p>
                    </div>
                </div>
                <div className='hidden w-0 h-4/6 md:flex md:w-4/6 justify-center gap-1'>
                    <div className='w-4/5 min-h-3 bg-white flex flex-col shadow-md rounded-xl border border-slate-200 p-5 justify-between'>
                        <div className='flex items-end gap-1'>
                            <p className='font-medium text-xl'>$3,951</p>
                            <p>night</p>
                        </div>
                        <div className='border rounded-xl'>
                            <div className='flex'>
                                <div className='w-1/2 p-5 border-r-2'>
                                    <p className='font-semibold text-sm overflow-hidden'>CHECK-IN</p>
                                    <p className='text-xs overflow-hidden'>23/04/2023</p>
                                </div>
                                <div className='w-1/2 p-5'>
                                    <p className='font-semibold text-sm overflow-hidden'>CHECKOUT</p>
                                    <p className='text-xs overflow-hidden'>25/04/2023</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center p-5 border-t-2'>
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
            </div>
            <div className='h-px w-full bg-slate-300 my-7 rounded '></div>
            <div>
                <div className='w-full text-center'>
                    <p className='font-semibold text-2xl'>Guest Reviews</p>
                </div>
                <div className='w-full py-6'>
                    <ul className='flex flex-wrap justify-evenly'>
                        <li className='flex flex-col h-40 w-40 justify-between'>
                            1
                        </li>
                        <li className='reviewbox'>
                            <div>
                                <p>Cleanliness</p>
                                <p>5.0</p>
                            </div>
                            <MdOutlineCleanHands className='text-3xl' />
                        </li>
                        <li className='reviewbox'>3</li>
                        <li className='reviewbox'>4</li>
                        <li className='reviewbox'>5</li>
                        <li className='reviewbox'>6</li>
                        <li className='reviewbox'>7</li>
                    </ul>
                </div>
            </div>
            <div className='h-px w-full bg-slate-300 my-7 rounded '></div>
        </div>
    )
}

export default SpotDetails