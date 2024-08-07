import React from 'react'
import { IoIosStarOutline } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

function UserReview({ imageUrl, data }) {
    return (
        <div className='flex flex-col w-full md:w-1/4 gap-4 mb-10 p-3'>
            <div className='flex items-center gap-5'>
                {/* <img className='h-14 w-14 rounded-full' src={imageUrl} /> */}
                <div>
                    <p className='text-lg font-semibold'>User</p>
                    <p className='text-sm text-slate-400'>{data.reviewer.email}</p>
                </div>
            </div>
            <div className='flex items-center gap-1'>
                <ul className='flex'>
                    {
                        Array.from({ length: 5 }, (_, index) => (
                            <li>
                                {index < data.rating ? <IoStarSharp /> : <IoIosStarOutline />}
                            </li>
                        ))
                    }
                </ul>
                <p className='text-sm text-slate-700'>4 weeks ago</p>
            </div>
            <div className='w-4/5'>
                <p>
                    {data.content}
                </p>
                <button className='underline p-2 bg-slate-100 rounded-lg text-sm'>Show more</button>
            </div>
        </div>
    )
}

export default UserReview