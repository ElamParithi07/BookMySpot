import React, { useState } from 'react';
import { GrKey } from 'react-icons/gr';
import { IoMdStar } from 'react-icons/io';
import { PiDoorOpen } from 'react-icons/pi';
import { SlLocationPin } from 'react-icons/sl';
import ReserveSpotCard from './ReserveSpotCard';
import UserReview from './UserReview';
import { CiEdit } from "react-icons/ci";
import ReviewCard from '../ReviewCard';

function SpotDetails({ data }) {
    const [ showReview, setShowReview] = useState(false);
    const imageUrl ='https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';

    function toggleshowreview(){
        setShowReview(!showReview)
    }
    return (
        <div className='w-full mt-3'>
            {
                showReview && <ReviewCard toggleshowreview={toggleshowreview} spotid={data._id}/>
            }
            {/* Spot details body section */}
            <div className='flex flex-col md:flex-row'>
                {/* spot details left portion */}
                <div className='flex flex-col w-full md:w-4/5'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-base md:text-xl font-medium'>
                            {data.about}
                        </p>
                        {/* <ul className='flex flex-wrap gap-2 md:gap-4'>
                            <li className='placecardtext flex items-center'>
                                <span className='mr-1'>16+ guests</span>
                            </li>
                            <li className='placecardtext flex items-center'>
                                <span className='mr-1'>6 bedrooms</span>
                            </li>
                            <li className='placecardtext flex items-center'>
                                <span className='mr-1'>12 beds</span>
                            </li>
                            <li className='placecardtext flex items-center'>
                                <span className='mr-1'>6.5 bathrooms</span>
                            </li>
                        </ul> */}
                        <div className='flex items-center gap-3'>
                            <div className='flex gap-1 items-center'>
                                <IoMdStar className='placecardtext' />
                                <p className='placecardtext'>4.75</p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <p className='placecardtext'>1</p>
                                <p className='placecardtext underline'>Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='flex items-center gap-3'>
                        <img className='h-8 w-8 rounded-full' src={imageUrl} />
                        <div>
                            <p className='text-sm md:text-base'>Hosted by {data.name}</p>
                            <p className='text-xs md:text-sm text-slate-400'>{data.spotstatus ? "Spot is Opened" : "Spot is Closed"}</p>
                        </div>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='w-full p-4'>
                        <ul className='flex flex-col gap-5'>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <PiDoorOpen className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Self Check-in</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>
                                        You can check in with the building staff.
                                    </p>
                                </div>
                            </li>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <SlLocationPin className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Great Location</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>
                                        100% of recent guests gave the location a 5-star rating.
                                    </p>
                                </div>
                            </li>
                            <li className='flex items-center gap-6 md:gap-9'>
                                <GrKey className='text-2xl md:text-3xl' />
                                <div>
                                    <p className='font-medium text-base md:text-lg'>Great check-in experience</p>
                                    <p className='text-slate-500 text-xs md:text-sm'>
                                        93% of recent guests gave the check-in process a 5-star rating.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='h-px w-full md:w-5/6 bg-slate-300 my-7 rounded'></div>
                    <div className='w-full p-3 flex flex-col gap-3 items-start'>
                        <p className='font-medium text-base md:text-lg'>About the Place</p>
                        <p className='text-slate-800 text-sm md:text-base w-4/5'>
                            {data.name} is a beautiful Turf located on our Coffee plantation
                            and a just few minutes from the famous Nagarahole Tiger Reserve, Kabini, Brahmagiri
                            <button className='underline p-2 bg-slate-100 rounded-lg'>Show more</button>
                        </p>
                    </div>
                </div>
                {/* Reserve spot card */}
                <ReserveSpotCard data={data} />
            </div>
            <div className='h-px w-full bg-slate-300 my-7 rounded'></div>
            {/* Review rating section */}
            <div className='w-full text-center mb-10 flex flex-col items-center'>
                <p className='font-semibold text-2xl'>Guest Reviews</p>
                <div className='h-px w-1/5 bg-slate-300 md:my-7 rounded'></div>
                <button onClick={()=>toggleshowreview()}>
                    <p className='flex items-center gap-3 bg-slate-100 p-1 md:p-2 my-3 text-xs md:text-base md:my-0 rounded-lg cursor-pointer'><CiEdit/>Write a review</p>
                </button>
            </div>
            {/* Reviews text*/}
            <div className='w-full pb-10 md:pb-0 md:flex justify-evenly'>
                {data.reviews && data.reviews.map((item, index)=>{
                    return (
                        <>
                            <UserReview imageUrl={imageUrl} data={item} key={index}/>
                        </>
                    )
                })}
            </div>
        </div>
    );
}

export default SpotDetails;
