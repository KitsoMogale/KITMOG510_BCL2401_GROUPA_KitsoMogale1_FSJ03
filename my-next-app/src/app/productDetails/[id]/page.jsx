'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SortReviews from '../../components/SortReviews'
import WithAuth from "@/app/components/WithAuth";
import ReviewForm from "@/app/components/Review";

 function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:3000/api/productdetails/${params.id}`);
        const data = await res.json();
        console.log(data)
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, [params.id]);


  useEffect(()=>{

  },[])


  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
            <div className="mt-6">
        <Link href="/">
          <button className="bg-gray-800 m-2 text-white px-4 py-2 rounded">Back to Products</button>
        </Link>
      </div>
      {/* Product Gallery */}
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-1/2">
          {product.images.length > 1 ? (
            <div className="relative">
              {/* Main Image */}
              <img
                className="w-full h-96 object-cover rounded-lg"
                src={product.images[0]}
                alt={product.title}
              />
              {/* Thumbnail Gallery */}
              <div className="flex mt-2 space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className="w-24 h-24 object-cover cursor-pointer rounded-lg border-2 border-transparent hover:border-gray-300"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => document.querySelector('img').src = image}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img
              className="w-full h-96 object-cover rounded-lg"
              src={product.images[0]}
              alt={product.title}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-800">${product.price}</span>
            <span className="text-sm text-gray-500 ml-4 text-blue-600">{product.category}</span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-gray-600 ml-2">({product.rating})</span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <span className="font-bold text-green-500">Stock:</span> {product.stock}
          </div>

          <div className="mb-6">
            <span className="font-bold text-gray-800">Tags:</span>
            <div className="flex flex-wrap mt-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <SortReviews reviews={product.reviews}/>
              {/* {product.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                  <p className="font-bold">{review.name}</p>
                  <p className="text-gray-600 text-sm mb-2">{review.date}</p>
                  <p className="text-gray-800 mb-2">{review.comment}</p>
                  <div className="text-yellow-500">
                    {'★'.repeat(Math.round(review.rating))}
                    {'☆'.repeat(5 - Math.round(review.rating))}
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
        <ReviewForm/>
      </div>
    </div>
  );
}

export default WithAuth(ProductDetails)