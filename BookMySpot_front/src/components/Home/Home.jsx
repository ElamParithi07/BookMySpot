import React from 'react'
import HomeheaderBar from './HomeheaderBar';
import HomePageBody from './HomePageContent/HomePageBody';

function Home() {
    return (
        <div className='mx-7 md:mx-40 flex flex-col'>
            <HomeheaderBar />
            <div className='md:pt-20'>
                <HomePageBody />
            </div>
        </div>
    )
}

export default Home