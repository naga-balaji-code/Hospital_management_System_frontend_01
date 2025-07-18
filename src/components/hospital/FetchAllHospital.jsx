import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance/Instance";

const FetchAllHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await axiosInstance.get("/fetchAllHospital");
      setHospitals(res.data);
      setIsVisible(true);
      toast.success("Hospitals loaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch hospitals");
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
      }}
    >
      <Toaster position="top-center" />

      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Fetch All Hospitals
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={fetchHospitals}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition font-semibold"
        >
          Load All Hospitals
        </button>
      </div>

      {isVisible && (
        <>
          {hospitals.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No hospitals found.
            </p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4 max-w-6xl mx-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="py-3 px-4 border">ID</th>
                    <th className="py-3 px-4 border">Name</th>
                    <th className="py-3 px-4 border">Phone</th>
                    <th className="py-3 px-4 border">Email</th>
                    <th className="py-3 px-4 border">GST</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hospital, index) => (
                    <tr
                      key={hospital.hospitalId || index}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="py-2 px-4 border text-center">
                        {hospital.hospitalId}
                      </td>
                      <td className="py-2 px-4 border font-semibold">
                        {hospital.hospitalName}
                      </td>
                      <td className="py-2 px-4 border">{hospital.hospitalPhone}</td>
                      <td className="py-2 px-4 border">{hospital.hospitalEmail}</td>
                      <td className="py-2 px-4 border">{hospital.hospitalGst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FetchAllHospital;
