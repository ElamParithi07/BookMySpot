import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import axios from 'axios';

function NavSearchbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [responseList, setResponseList] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1); // State to keep track of the focused result

    useEffect(() => {
        const getData = setTimeout(async () => {
            if (searchTerm.trim() === "" || !isFocused) { 
                setResponseList([]);
                return;
            }
            try {
                console.log("fetching..")
                const response = await axios.get(`http://www.omdbapi.com/?s={query}&apikey=e6e3e27`);
                const responseData = response.data;
                console.log(responseData);
                setResponseList(responseData.Search || []);
                setFocusedIndex(-1); // Reset focused index on new search
            } catch (error) {
                console.error(error);
            }
        }, 800);
        return () => clearTimeout(getData);
    }, [searchTerm, isFocused]);

    const handleKeyDown = (e) => {
        if (responseList.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusedIndex(prevIndex => Math.min(prevIndex + 1, responseList.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusedIndex(prevIndex => Math.max(prevIndex - 1, 0));
            } else if (e.key === 'Enter' && focusedIndex >= 0) {
                // Handle enter key press on focused result
                window.location.href = `http://www.omdbapi.com/?i=${responseList[focusedIndex].imdbID}&apikey=e6e3e27`;
            }
        }
    };

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
                onKeyDown={handleKeyDown}
            />
            <button className='bg-primary h-12 w-12 p-3 rounded-full justify-center items-center'>
                <GoSearch className='text-white font-bold text-2xl' />
            </button>
            {responseList.length > 0 && isFocused && (
                <div className='fixed flex flex-col w-3/4 md:w-2/4 h-2/4 bg-white rounded-sm mt-16 shadow-md overflow-y-auto z-50'>
                    {responseList.map((item, index) => {
                        return (
                            <p
                                key={item.imdbID}
                                className={`p-6  ${focusedIndex === index ? 'bg-gray-200' : ''}`}
                                onMouseEnter={() => setFocusedIndex(index)}
                            >
                                {item.Title}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default NavSearchbar;
