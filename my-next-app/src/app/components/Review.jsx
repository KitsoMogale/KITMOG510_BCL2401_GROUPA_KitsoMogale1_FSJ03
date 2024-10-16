'use client'
import { useEffect, useState } from 'react';

function ReviewForm(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);  // Default rating set to 5
  const [name,setName] = useState('')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    useEffect(()=>{
        if (typeof window !== "undefined") {
            const fullname = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`
            setName(fullname)
        }
    },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docId = props.id
    // Set time of the post in handleSubmit
    const currentTime = new Date().toLocaleString();

    
    console.log({ comment, rating, timePosted: currentTime,reviewerName:name, });
    try{
    const res = await fetch(`${apiUrl}/api/addReviews`, {method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify({docId,comment,rating,date:currentTime,reviewerName:name}), })
    // console.log(res);
    const data = await res.json();
    alert("Review added successfully")
    props.reload();
  }
  catch(e){
    console.log(e)
    alert("failed to add review,try again.")
  }
    // Handle form submission (e.g., send review data to the server)
  };

  return (
    <>
    <h1  className='font-bold'>Add review:</h1>
    <form onSubmit={handleSubmit} className="max-w-2xl h-fit mt-2 relative bottom-12 mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Comment Section */}
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 text-sm font-semibold mb-2">
          Comment:
        </label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your review here..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Rating Section */}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 text-sm font-semibold mb-2">
          Rating:
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
      </div>
      {/* Time of Post - this will be set automatically in handleSubmit */}
      <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit Review
          </button>
        </div>

    </form>
        </>
  );
}

export default ReviewForm;

