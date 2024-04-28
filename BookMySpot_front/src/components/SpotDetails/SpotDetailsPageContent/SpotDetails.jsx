import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { GrKey } from 'react-icons/gr';
import { IoMdStar } from 'react-icons/io';
import { PiDoorOpen } from 'react-icons/pi';
import { SlLocationPin } from 'react-icons/sl';
import { PiCheckCircle } from 'react-icons/pi';
import { BsChatSquare } from 'react-icons/bs';
import { BsMap } from 'react-icons/bs';
import { BsTag } from 'react-icons/bs';
import { VscSparkle } from 'react-icons/vsc';
import ReserveSpotCard from './ReserveSpotCard';
import UserReview from './UserReview';

function SpotDetails() {
    const imageUrl =
        'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';

    return (
        <div className='w-full mt-3'>
            {/* Spot details body section */}
            <div className='flex flex-col md:flex-row'>
                {/* spot details left portion */}
                <div className='flex flex-col w-full md:w-4/5'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-base md:text-xl font-medium'>
                            Private room in nature lodge in India
                        </p>
                        <ul className='flex flex-wrap gap-2 md:gap-4'>
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
                    <div className='flex items-center gap-3'>
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
                            Vanandhaara is a beautiful Villa & HomeStay in Coorg located on our Coffee plantation
                            and a just few minutes from the famous Nagarahole Tiger Reserve, Kabini, Brahmagiri
                            hills, Irpu falls & other attractions. We offer 6 exquisitely designed large & clean
                            rooms, each with a private balcony and private bathroom. Individual room's or the
                            Entire villa can be reserved by guests. For eg...
                            <button className='underline p-2 bg-slate-100 rounded-lg'>Show more</button>
                        </p>
                    </div>
                </div>
                {/* Reserve spot card */}
                <ReserveSpotCard />
            </div>
            <div className='h-px w-full bg-slate-300 my-7 rounded'></div>
            {/* Review rating section */}
            <div className='w-full text-center'>
                <p className='font-semibold text-2xl'>Guest Reviews</p>
            </div>
            <div className='w-full py-6'>
                <ul className='flex flex-wrap justify-evenly'>
                    <li className='flex flex-col h-36 w-3/4 md:w-36 gap-1 justify-center'>
                        <p>Overall rating</p>
                        <ul className='flex flex-col'>
                            <li className='flex text-sm items-center gap-1'>
                                <p>5</p>
                                <div className="w-4/5 bg-gray-200 h-1 rounded-md overflow-hidden">
                                    <div
                                        className="bg-black h-1 transition-all duration-300"
                                        style={{ width: `50%` }}
                                    ></div>
                                </div>
                            </li>
                            <li className='flex text-sm items-center gap-1'>
                                <p>4</p>
                                <div className="w-4/5 bg-gray-200 h-1 rounded-md overflow-hidden">
                                    <div
                                        className="bg-black h-1 transition-all duration-300"
                                        style={{ width: `10%` }}
                                    ></div>
                                </div>
                            </li>
                            <li className='flex text-sm items-center gap-1'>
                                <p>3</p>
                                <div className="w-4/5 bg-gray-200 h-1 rounded-md overflow-hidden">
                                    <div
                                        className="bg-black h-1 transition-all duration-300"
                                        style={{ width: `14%` }}
                                    ></div>
                                </div>
                            </li>
                            <li className='flex text-sm items-center gap-1'>
                                <p>2</p>
                                <div className="w-4/5 bg-gray-200 h-1 rounded-md overflow-hidden">
                                    <div
                                        className="bg-black h-1 transition-all duration-300"
                                        style={{ width: `60%` }}
                                    ></div>
                                </div>
                            </li>
                            <li className='flex text-sm items-center gap-1'>
                                <p>1</p>
                                <div className="w-4/5 bg-gray-200 h-1 rounded-md overflow-hidden">
                                    <div
                                        className="bg-black h-1 transition-all duration-300"
                                        style={{ width: `0%` }}
                                    ></div>
                                </div>
                            </li>
                        </ul>

                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Cleanliness</p>
                            <p className='text-lg font-medium'>5.0</p>
                        </div>
                        <VscSparkle className='text-5xl' />
                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Accuracy</p>
                            <p className='text-lg font-medium'>4.8</p>
                        </div>
                        <PiCheckCircle className='text-5xl' />
                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Check-in</p>
                            <p className='text-lg font-medium'>4.9</p>
                        </div>
                        <GrKey className='text-4xl' />
                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Communication</p>
                            <p className='text-lg font-medium'>4.8</p>
                        </div>
                        <BsChatSquare className='text-4xl' />
                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Location</p>
                            <p className='text-lg font-medium'>4.5</p>
                        </div>
                        <BsMap className='text-4xl' />
                    </li>
                    <li className='reviewbox'>
                        <div>
                            <p>Value</p>
                            <p className='text-lg font-medium'>4.6</p>
                        </div>
                        <BsTag className='text-4xl' />
                    </li>
                </ul>
            </div>
            <div className='h-px w-full bg-slate-300 my-7 rounded'></div>
            {/* Reviews text*/}
            <div className='w-full'>
                <UserReview imageUrl={imageUrl} rating={2} />
            </div>
        </div>
    );
}

export default SpotDetails;
