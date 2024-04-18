import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import axios from 'axios';

function NavSearchbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [responseList, setResponseList] = useState([]);
    const [isFocused, setIsFocused] = useState(false); 

    useEffect(() => {
        const handlefetchSpot = async () => {
            if (searchTerm.trim() === "" || !isFocused) { 
                setResponseList([]);
                return;
            }
            try {
                const response = await axios.get(`https://dummyapi.online/api/movies`);
                console.log(response.data);
                setResponseList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        handlefetchSpot();
    }, [searchTerm, isFocused]);

    return (
        <div className='flex basis-4/6 gap-1'>
            <input
                type='text'
                placeholder='Search your favourite spot now..'
                className='px-3 w-screen md:w-5/6 border-slate-100 border bg-slate-100 rounded-3xl focus:outline-none '
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)} 
            />
            <button className='bg-primary h-12 w-12 p-3 rounded-full justify-center items-center'><GoSearch className='text-white font-bold text-2xl' /></button>
            {responseList.length > 0 && isFocused && (
                <div className='flex flex-col w-5/6 h-2/4 bg-white absolute rounded-lg mt-16 shadow-md overflow-y-auto'>
                    {responseList?.map((item, index) => {
                        return (
                            <div key={item.id} className='flex w-full h-13 p-4 justify-between items-center border first:border-t-0 last:border-b-0'>
                                <p>{item.movie}</p>
                                <p>{item.rating}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default NavSearchbar;
