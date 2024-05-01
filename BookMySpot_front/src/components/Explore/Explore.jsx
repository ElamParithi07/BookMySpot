import React from 'react';

function Explore() {
  return (
    <div className='md:mx-10 h-full bg-slate-300'>
      <div className='p-8 flex flex-col gap-4'>
        <p className='text-3xl font-semibold'>New this week</p>
        <div className='overflow-x-auto flex h-80'>
          <div className='flex flex-row space-x-4'>
            <div className='flex flex-col justify-between p-6 h-80 w-3/5 bg-white rounded-xl'>
              <div>
                <p className='text-xs'>Collection</p>
                <p className='text-2xl'>Most popular around the world</p>
              </div>
              <div>
                <div className='p-3 bg-slate-300 w-20 rounded-md'>
                  <p className='text-sm text-white'>Show all</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between p-6 h-80 w-3/5 bg-white rounded-xl'>
              <div>
                <p className='text-xs'>Collection</p>
                <p className='text-2xl'>Most popular around the world</p>
              </div>
              <div>
                <div className='p-3 bg-slate-300 w-20 rounded-md'>
                  <p className='text-sm text-white'>Show all</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between p-6 h-80 w-3/5 bg-white rounded-xl'>
              <div>
                <p className='text-xs'>Collection</p>
                <p className='text-2xl'>Most popular around the world</p>
              </div>
              <div>
                <div className='p-3 bg-slate-300 w-20 rounded-md'>
                  <p className='text-sm text-white'>Show all</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between p-6 h-80 w-3/5 bg-white rounded-xl'>
              <div>
                <p className='text-xs'>Collection</p>
                <p className='text-2xl'>Most popular around the world</p>
              </div>
              <div>
                <div className='p-3 bg-slate-300 w-20 rounded-md'>
                  <p className='text-sm text-white'>Show all</p>
                </div>
              </div>
            </div>
            
            {/* Add more card elements here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
