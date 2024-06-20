import React from 'react'
import HomePageBody from './HomePageContent/HomePageBody';
import axios from 'axios'


function Home() {
    

    return (
        <div className='mx-7 my-28 md:my-0 md:mx-40 flex flex-col'>
            <HomePageBody />
        </div>
    )
}

export default Home