import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const DeleteHospital = () => {
  const [hospitalId, setHospitalId] = useState('');

  const handleDelete = async () => {
    if (!hospitalId || Number(hospitalId) <= 0) {
      toast.error('Please enter a valid Hospital ID');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/deleteHospitalById?hospitalId=${hospitalId}`);
      toast.success(`Hospital with ID ${hospitalId} deleted successfully`);
      setHospitalId('');
    } catch (error) {
      toast.error('Failed to delete hospital. ID may not exist.');
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-700">Delete Hospital</h2>

        <input
          type="number"
          placeholder="Enter Hospital ID"
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md outline-none"
        />

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 active:scale-95 font-semibold"
        >
          Delete Hospital
        </button>
      </div>
    </div>
  );
};

export default DeleteHospital;