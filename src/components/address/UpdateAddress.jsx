import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiEditAlt } from 'react-icons/bi';
import { BsBuildings } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import { MdLocationPin } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';

const UpdateAddress = () => {
  const [addressId, setAddressId] = useState('');
  const [formData, setFormData] = useState({
    addressPlotNumber: '',
    addressCity: '',
    addressLandMark: '',
    addressPincode: '',
    addressState: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addressId || Object.values(formData).some((v) => v.trim() === '')) {
      toast.error('All fields including ID are required');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/updateAddressById?oldAddressId=${addressId}`,
        formData
      );

      if (response.status === 200) {
        toast.success('Address updated successfully!');
        setAddressId('');
        setFormData({
          addressPlotNumber: '',
          addressCity: '',
          addressLandMark: '',
          addressPincode: '',
          addressState: '',
        });
      }
    } catch (error) {
      toast.error('Failed to update address');
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-sm:w-[90%] bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-6 px-[30px] py-12 overflow-scroll"
      >
        <h1 className="text-3xl font-bold text-center text-blue-800 max-md:text-xl">
          Update Address Form
        </h1>

        <div className="border-2 w-full flex items-center px-3 rounded-md">
          <input
            type="number"
            name="addressId"
            placeholder="Enter Address ID to Update"
            className="w-full outline-none px-4 h-10"
            value={addressId}
            onChange={(e) => setAddressId(e.target.value)}
          />
          <span>
            <BiEditAlt />
          </span>
        </div>

        {[
          {
            label: 'Plot Number',
            name: 'addressPlotNumber',
            icon: <MdLocationPin />,
          },
          {
            label: 'City',
            name: 'addressCity',
            icon: <FaCity />,

          },
          {
            label: 'Landmark',
            name: 'addressLandMark',
            icon: <GiPathDistance />,
          },
          {
            label: 'Pincode',
            name: 'addressPincode',
            icon: <RiMapPin2Fill />,
          },
          {
            label: 'State',
            name: 'addressState',
            icon: <BsBuildings />,
          },
        ].map(({ label, name, icon }) => (
          <div
            key={name}
            className="border-2 w-full flex items-center px-3 rounded-md"
          >
            <input
              type="text"
              name={name}
              placeholder={`Enter ${label}`}
              value={formData[name]}
              onChange={handleChange}
              className="w-full outline-none px-4 h-10"
            />
            <span>{icon}</span>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-bold hover:bg-gray-800 active:bg-lime-500 active:scale-[0.95] transition"
        >
          Update Address
        </button>
      </form>
    </div>
  );
};

export default UpdateAddress;