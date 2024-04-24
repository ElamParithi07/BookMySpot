import React from 'react';
import { TbGridDots } from "react-icons/tb";

function SpotImageGrid() {
    const imageUrl = 'https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=1200';
    return (
        <div className='flex flex-col h-96 md:flex-row w-full gap-0.5 shadow-sm cursor-pointer'>
            <div className='h-1/2 md:h-full w-full md:w-1/2 shrink:0'>
                <img
                    placeholder={'Image'}
                    src={imageUrl}
                    className='h-full w-full md:rounded-l-lg rounded-t-lg object-cover'
                />
            </div>
            <div className='flex flex-col h-1/2 md:h-full w-full md:w-1/2 gap-0.5'>
                <div className='flex h-1/2 w-full gap-0.5'>
                    <div className='h-full w-1/2 shrink:0'>
                        <img
                            placeholder={'Image'}
                            src={imageUrl}
                            className='h-full w-full object-cover'
                        />
                    </div>
                    <div className='h-full w-1/2 shrink:0'>
                        <img
                            placeholder={'Image'}
                            src={imageUrl}
                            className='h-full w-full md:rounded-tr-lg object-cover'
                        />
                    </div>
                </div>
                <div className='flex h-1/2 w-full gap-0.5'>
                    <div className='h-full w-1/2 shrink:0'>
                        <img
                            placeholder={'Image'}
                            src={imageUrl}
                            className='h-full w-full rounded-bl-lg md:rounded-none object-cover'
                        />
                    </div>
                    <div className='h-full w-1/2 shrink:0'>
                        <img
                            placeholder={'Image'}
                            src={imageUrl}
                            className='h-full w-full rounded-br-lg md:rounded-br-lg object-cover'
                        />
                    </div>
                </div>
            </div>
            {/* <div className='flex md:w-2/5 items-center float-right justify-center p-1 gap-2 border border-black rounded-lg bg-white'>
                <TbGridDots />
                <p className='text-xs'>Show all Photos</p>
            </div> */}
        </div>
    );
}

export default SpotImageGrid;
