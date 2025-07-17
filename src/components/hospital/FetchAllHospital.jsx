
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../axiosInstance/Instance';

const FetchAllHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await axiosInstance.get('/fetchAllHospital');
      setHospitals(res.data);
      setIsVisible(true);
      toast.success('Hospitals loaded successfully');
    } catch (err) {
      toast.error('Failed to fetch hospitals');
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />

      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 p-5">
        Fetch All Hospitals
      </h2>

      <div className="flex justify-center mb-10">
        <button
          onClick={fetchHospitals}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition font-semibold " 
        >
          Load All Hospitals
        </button>
      </div>

      {isVisible && (
        <>
          {hospitals.length === 0 ? (
            <p className="text-center text-gray-500">No hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.hospitalId}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
                >
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Hospital ID</p>
                    <p className="font-semibold text-lg">{hospital.hospitalId}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-lg">{hospital.hospitalName}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-700">{hospital.hospitalPhone}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-700">{hospital.hospitalEmail}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">GST</p>
                    <p className="text-gray-700">{hospital.hospitalGst}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FetchAllHospital;