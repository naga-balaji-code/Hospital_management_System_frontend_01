import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteForever } from 'react-icons/md';
import axiosInstance from '../axiosInstance/Instance';

const DeleteAddress = () => {
  const [addressId, setAddressId] = useState('');

  const handleDelete = async () => {
    if (!addressId || Number(addressId) <= 0) {
      toast.error('Please enter a valid address ID');
      return;
    }

    try {
      const response = await axiosInstance.delete(`/deleteAddressById?addressId=${addressId}`
      );

      if (response.status === 200) {
        toast.success('Address deleted successfully!');
        setAddressId('');
      }
    } catch (error) {
      toast.error('Address not found or delete failed!');
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
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className="w-1/2 max-sm:w-[90%] bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-6 px-6 py-10"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 max-md:text-xl flex items-center gap-2">
          <MdDeleteForever className="text-4xl" />
          Delete Address By ID
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
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-bold py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition"
        >
          <MdDeleteForever className="text-xl" />
          Delete Address
        </button>
      </form>
    </div>
  );
};

export default DeleteAddress;