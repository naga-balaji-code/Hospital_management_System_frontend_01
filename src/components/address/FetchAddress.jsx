
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsBuildings } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { MdLocationPin } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import axiosInstance from '../axiosInstance/Instance';

const FetchAddress= () => {
  const [addressId, setAddressId] = useState('');
  const [address, setAddress] = useState(null);

  const handleFetch = async () => {
    if (!addressId || Number(addressId) <= 0) {
      toast.error("Please enter a valid address ID");
      return;
    }

    try {
      const res = await axiosInstance.get(`/fetchAddressById?addressId=${addressId}`);
      setAddress(res.data.data);
      toast.success("Address fetched successfully!");
    } catch (error) {
      setAddress(null);
      toast.error("Address not found!");
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      <div className="w-1/2 max-sm:w-[90%] bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-6 px-6 py-10 overflow-scroll">
        <h1 className="text-3xl font-bold text-center text-blue-800 max-md:text-xl">
          Fetch Address By ID
        </h1>

        <div className="border-2 w-full flex items-center px-3 rounded-md">
          <input
            type="number"
            name="addressId"
            placeholder="Enter Address ID"
            className="w-full outline-none px-4 h-10"
            value={addressId}
            onChange={(e) => setAddressId(e.target.value)}
          />
          <button
            type="button"
            onClick={handleFetch}
            className="text-xl p-2 text-blue-700 hover:text-blue-900"
          >
            <BiSearchAlt2 />
          </button>
        </div>

        {address && (
          <div className="w-full bg-[#f9f9f9] border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-800">
              <MdLocationPin className="text-lg" />
              <span className="font-semibold">Plot Number:</span> {address.addressPlotNumber}
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <FaCity className="text-lg" />
              <span className="font-semibold">City:</span> {address.addressCity}
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <GiPathDistance className="text-lg" />
              <span className="font-semibold">Landmark:</span> {address.addressLandMark}
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <RiMapPin2Fill className="text-lg" />
              <span className="font-semibold">Pincode:</span> {address.addressPincode}
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <BsBuildings className="text-lg" />
              <span className="font-semibold">State:</span> {address.addressState}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchAddress;