import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import axios from 'axios'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
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
  // useEffect(() => {
  //   // Fetch data from your backend API
  //   const fetchListings = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/listings"); // Update with your API endpoint
  //       setListings(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch listings.");
  //       setLoading(false);
  //     }
  //   };

  //   const fetchOfferListings = async () => {
  //     try {
  //       const res = await fetch('/api/listing/get?offer=true&limit=4');
  //       const data = await res.json();
  //       setOfferListings(data);
  //       fetchRentListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const fetchRentListings = async () => {
  //     try {
  //       const res = await fetch('/api/listing/get?type=rent&limit=4');
  //       const data = await res.json();
  //       setRentListings(data);
  //       fetchSaleListings();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchSaleListings = async () => {
  //     try {
  //       const res = await fetch('/api/listing/get?type=sale&limit=4');
  //       const data = await res.json();
  //       setSaleListings(data);
  //     } catch (error) {
  //       log(error);
  //     }
  //   };
  //   // fetchOfferListings();
    
  //   fetchListings();
  // }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-800 font-serif font-bold text-3xl lg:text-7xl'>
          Luxury Real Estates 
        </h1>
        <div className='text-gray-400 font-serif text-sm sm:text-lg'>
          We have a wide range of properties for you, <br/>find your dream home right away!
        </div>
        <div className=' mt-4'>
        <Link
          to={'/search'}
          className='text-sm bg-slate-800 font-serif sm:text-md px-10 py-4 rounded-md text-white font-semibold hover:underline'
        >
          Explore More
        </Link>
        </div>
       
      </div>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Recommended Listings</h1>

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
            </div>
          </div>
        ))}
      </div>
    </div>



      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* listing results for offer, sale and rent */}

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
  
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
      
      
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
       
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
      
      </div> */}
    </div>
  );
}
