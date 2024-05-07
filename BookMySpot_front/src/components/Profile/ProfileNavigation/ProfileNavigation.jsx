import React, { useState } from 'react'
import Profilesidebar from './Profilesidebar'
import { Outlet } from 'react-router'
import EditProfile from './EditProfile';
import Booking from './Booking';
import MySpotDashboard from './MySpotDashboard';
import Saved from './Saved';
import Settings from './Settings';

function ProfileNavigation() {
    const [route, setRoute] = useState(1);

    const handleRoute =(route)=>{
        setRoute(route);
    }
    return (
        <div className='flex w-full h-96 mt-10 px-10'>
            <div className='h-full w-full md:w-96'>
                <Profilesidebar handleRoute={handleRoute} currentRoute={route}/>
            </div>
            <div className='w-full p-4 '>
                {
                    route===1?
                    <EditProfile/>:
                    route===2?
                    <Booking/>:
                    route===3?
                    <MySpotDashboard/>:
                    route===4?
                    <Saved/>:
                    <Settings/>
                }
            </div>
        </div>
    )
}

export default ProfileNavigation