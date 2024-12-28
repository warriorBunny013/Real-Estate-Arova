import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListingItem from '../components/ListingItem';

export default function Search() {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    // Fetch data from your backend API
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/listings"); // Update with your API endpoint
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch listings.");
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Real Estates</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{listing.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{listing.description}</p>

            <div className="text-gray-800">
              <p><strong>Address:</strong> {listing.address}</p>
              <p><strong>Price:</strong> ${listing.regularPrice}</p>
              {listing.offer && (
                <p className="text-red-500"><strong>Discount Price:</strong> ${listing.discountPrice}</p>
              )}
              <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
              <p><strong>Furnished:</strong> {listing.furnished ? "Yes" : "No"}</p>
              <p><strong>Parking:</strong> {listing.parking ? "Available" : "Not Available"}</p>
              <p><strong>Type:</strong> {listing.type}</p>
              <p><strong>User Ref:</strong> {listing.userRef}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold">Images</h3>
              <div className="flex space-x-2 overflow-x-auto mt-2">
                {listing.imageUrls.slice(1).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${listing.name}-image-${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* View Button */}
            <div className="mt-4 text-right">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => {
                  // For example, redirect to a detailed view of the listing
                  // This could be a route like `/listing/${listing._id}` if using React Router
                  window.location.href = `/listing/${listing._id}`;
                }}
              >
                View Listing
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
