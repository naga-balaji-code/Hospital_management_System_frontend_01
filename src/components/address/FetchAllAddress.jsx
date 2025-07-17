
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BsBuildings } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { MdLocationPin } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import axiosInstance from '../axiosInstance/Instance';

const FetchAllAddresses= () => {
  const [addresses, setAddresses] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/fetchAllAddress');
      setAddresses(response.data);
      toast.success("Fetched all addresses!");
    } catch (error) {
      toast.error("Failed to fetch data!");
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      
      <div className="w-1/2 max-sm:w-[90%] bg-white shadow-2xl rounded-3xl px-6 py-8 flex flex-col items-center gap-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center max-md:text-xl">Fetch All Addresses</h2>

        <button
          onClick={fetchData}
          className="bg-black text-white w-full py-2 rounded-md font-bold hover:bg-gray-800 active:bg-lime-500 active:scale-[0.95] transition"
        >
          Fetch All Address
        </button>

        <div className="w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {addresses.length > 0 ? (
            addresses.map((addr, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-xl p-4 bg-[#f9f9f9] flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center gap-2 text-gray-800">
                  <MdLocationPin className="text-lg" />
                  <span className="font-semibold">Plot Number:</span> {addr.addressPlotNumber}
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <FaCity className="text-lg" />
                  <span className="font-semibold">City:</span> {addr.addressCity}
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <GiPathDistance className="text-lg" />
                  <span className="font-semibold">Landmark:</span> {addr.addressLandMark}
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <RiMapPin2Fill className="text-lg" />
                  <span className="font-semibold">Pincode:</span> {addr.addressPincode}
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <BsBuildings className="text-lg" />
                  <span className="font-semibold">State:</span> {addr.addressState}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No data fetched yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchAllAddresses;