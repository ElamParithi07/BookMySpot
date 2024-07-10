import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpotDashboard({ id }) {
  const [spot, setSpot] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updatedSpot, setUpdatedSpot] = useState({
    name: '',
    about: '',
    location: '',
    gmaplink: '',
    phonenumber: '',
    feeperhour: '',
    rating: '',
    spotstatus: '',
  });

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const spottoken = localStorage.getItem('msaToken');
        const response = await axios.get(`http://localhost:8083/spot/getspot`, {
          headers: {
            'Authorization': `Bearer ${spottoken}`,
            'Content-Type': 'application/json',
          },
        });
        const responseData = response.data;
        setSpot(responseData.data);
        setUpdatedSpot(responseData.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSpot({ ...updatedSpot, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const spottoken = localStorage.getItem('msaToken');
      const response = await axios.put(
        `http://localhost:8083/spot/updatespot`,
        updatedSpot,
        {
          headers: {
            'Authorization': `Bearer ${spottoken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSpot(updatedSpot);
      setEditable(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!spot) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-slate-700">Spot Dashboard</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {editable ? (
          <>
            <input
              type="text"
              name="name"
              value={updatedSpot.name}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Name"
            />
            <textarea
              name="about"
              value={updatedSpot.about}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="About"
            />
            <input
              type="text"
              name="location"
              value={updatedSpot.location}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Location"
            />
            <input
              type="text"
              name="gmaplink"
              value={updatedSpot.gmaplink}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Google Map Link"
            />
            <input
              type="text"
              name="phonenumber"
              value={updatedSpot.phonenumber}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="feeperhour"
              value={updatedSpot.feeperhour}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Fee per Hour"
            />
            <input
              type="number"
              name="rating"
              value={updatedSpot.rating}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Rating"
            />
            <select
              name="spotstatus"
              value={updatedSpot.spotstatus}
              onChange={handleInputChange}
              className="block w-full p-2 mb-4 border rounded"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditable(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">{spot.name}</h2>
            <p className="text-gray-700 mb-6">{spot.about}</p>
            <div className="mb-4">
              <p className="text-gray-900"><strong>Location:</strong> {spot.location}</p>
              <p className="text-gray-900">
                <strong>Google Map:</strong> <a href={spot.gmaplink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">View Map</a>
              </p>
              <p className="text-gray-900"><strong>Phone Number:</strong> {spot.phonenumber}</p>
              <p className="text-gray-900"><strong>Fee per Hour:</strong> {spot.feeperhour}</p>
              <p className="text-gray-900"><strong>Rating:</strong> {spot.rating || 'No rating yet'}</p>
              <p className="text-gray-900"><strong>Status:</strong> {spot.spotstatus ? 'Active' : 'Inactive'}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-blue-600">Reviews</h3>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                {spot.reviews.map((review) => (
                  <li key={review._id}>{review.content}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600">Slots</h3>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                {spot.slots.map((slot) => (
                  <li key={slot._id}>{slot.time}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setEditable(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SpotDashboard;
