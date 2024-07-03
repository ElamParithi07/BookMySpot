import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { createnewtoken } from '../RefreshSession/RefreshUser';
import { Bounce } from 'react-activity';

function ReviewCard({ toggleshowreview, spotid }) {
    const [value, setValue] = useState(2);
    const [review, setReview] = useState("");
    const [reviewindicator, setReviewindicator] = useState(false)

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                spotid: spotid,
                content: review,
                rating: value
            }
            console.log(reviewData)
            const authtoken = localStorage.getItem('authtoken')
            setReviewindicator(true)
            const response = await axios.post('http://localhost:8083/review/postreview', reviewData, {
                headers: {
                    'Authorization': `Bearer ${authtoken}`,
                    'Content-Type': 'application/json'
                }
            })
            const responseData = response.data
            setReviewindicator(false)
            alert(responseData.message)
            toggleshowreview();
        }
        catch (error) {
            setReviewindicator(false)
            console.log(error.message)
            if (error.response) {
                console.log(error.response.data); // response data
                console.log(error.response.status);
                if (error.response.status === 401) {
                    console.log('Token expired')
                    const email = localStorage.getItem('email')
                    await createnewtoken(email)
                    await handlePost();
                } else if (error.response.status === 400) {
                    alert('Invalid Auth Token');
                }
                else if(error.response.status === 409) {
                    alert(error.response.data.message)
                }
                else {
                    alert(error.response.data.message)
                    console.log('Unexpected Error:', error.response.data);
                }
            } else if (error.request) {
                console.log(error.request);
                alert('No response from the server');
            } else {
                console.log('Error:', error.message);
                alert('Error:', error.message);
            }
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='h-1/2 md:h-3/6 w-10/12 md:w-2/5 bg-white rounded-xl border'>
                <div className='flex flex-col items-end p-3'>
                    <button onClick={() => toggleshowreview()} className='flex items-center'><IoClose className='text-2xl' /></button>
                </div>
                <form onSubmit={handlePost} className='flex flex-col items-center'>
                    <p className='md:text-xl font-medium'>What do you think?</p>
                    <textarea
                        type='text'
                        placeholder='Share your experience'
                        className='h-28 p-3 m-3 border border-slate-300 rounded-lg w-7/8 md:w-3/4'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className='flex items-center gap-2'>
                        <p className='my-3 text-sm md:text-lg font-normal'>Rate this Spot</p>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            className="text-xl"
                        />
                    </div>
                    <button
                        className='flex items-center justify-center gap-2 bg-primary h-11 text-white rounded-md w-4/5 md:w-3/4 my-4'
                        type={!reviewindicator ? 'submit' : 'button'}
                    >
                        {reviewindicator ? <Bounce color="#ffff" size={12} speed={1} animating={true} /> : "Post Review"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ReviewCard