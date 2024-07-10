import React from 'react'
import { useLocation } from 'react-router'
import Wishlistcard from '../Wishlistcard';

function Wishlist() {
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-full md:w-3/4 py-9'>
                <div className='flex justify-between border-l-2 border-primary px-4'>
                    <p className='text-xl md:text-3xl font-medium'>Wishlist</p>
                </div>
                <div className='flex py-10 px-4'>
                    {
                        data.length!=0 ? data.map((item, index)=>{
                            return (
                                <Wishlistcard key={index} data={item}/>
                            )
                        }):
                        <p className='text-center py-10 text-sm text-slate-500'>No spots were added!</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Wishlist