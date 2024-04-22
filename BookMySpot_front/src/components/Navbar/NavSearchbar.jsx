import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import axios from 'axios';

function NavSearchbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [responseList, setResponseList] = useState([]);
    const [isFocused, setIsFocused] = useState(false); 

    useEffect(() => {
        const getData = setTimeout(async () => {
            if (searchTerm.trim() === "" || !isFocused) { 
                setResponseList([]);
                return;
            }
            try {
                console.log("fetching..")
                const response = await axios.get(`https://dummyapi.online/api/movies`);
                setResponseList(response.data);
            } catch (error) {
                console.error(error);
            }
        },800)
        return () => clearTimeout(getData)
    }, [searchTerm, isFocused]);

    return (
        <div className='relative flex basis-4/6 gap-1'>
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
                <div className='fixed flex flex-col w-3/4 md:w-2/4 h-2/4 bg-white rounded-sm mt-16 shadow-md overflow-y-auto z-50'>
                    <h1>hi</h1>
                </div>
            )}
        </div>
    );
}

export default NavSearchbar;
