
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../axiosInstance/Instance';

const FetchHospitalById = () => {
  const [hospitalId, setHospitalId] = useState('');
  const [hospital, setHospital] = useState(null);

  const handleFetch = async () => {
    if (!hospitalId || Number(hospitalId) <= 0) {
      toast.error('Please enter a valid Hospital ID');
      return;
    }

    try {
      const res = await axiosInstance.get(`/fetchHospitalById?hospitalId=${hospitalId}`);
      setHospital(res.data.data);
      toast.success('Hospital fetched successfully!');
    } catch (error) {
      setHospital(null);
      toast.error('Hospital not found!');
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      <div className="w-1/2 max-sm:w-[90%] bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-blue-800 text-center">Fetch Hospital By ID</h2>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter Hospital ID"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            className="w-full border p-2 rounded-md outline-none"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 active:scale-95"
          >
            Fetch
          </button>
        </div>

        {hospital && (
          <div className="bg-gray-50 border rounded-md p-4 space-y-2 shadow-inner">
            <p><strong>ID:</strong> {hospital.hospitalId}</p>
            <p><strong>Name:</strong> {hospital.hospitalName}</p>
            <p><strong>Phone:</strong> {hospital.hospitalPhone}</p>
            <p><strong>Email:</strong> {hospital.hospitalEmail}</p>
            <p><strong>GST:</strong> {hospital.hospitalGst}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchHospitalById;