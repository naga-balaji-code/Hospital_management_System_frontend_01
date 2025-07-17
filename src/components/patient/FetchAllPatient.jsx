
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance/Instance";

const FetchAllPatient = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await axiosInstance.get("/fetchAllPatient");
      if (res.data.length === 0) {
        toast.error("No patients found.");
      } else {
        setPatients(res.data);
        toast.success("Patients fetched successfully!");
      }
    } catch (err) {
      toast.error("Failed to fetch patients.");
    }
  };

  return (
    <div
       className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}
    >
      <Toaster position="top-center" />
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          All Patients
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchPatients}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Patients
          </button>
        </div>

        {patients.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Room #</th>
                  <th className="p-3">Report ID</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{patient.patientName}</td>
                    <td className="p-3">{patient.patientAge}</td>
                    <td className="p-3">{patient.patientGender}</td>
                    <td className="p-3">{patient.patientEmail}</td>
                    <td className="p-3">{patient.patientPhone}</td>
                    <td className="p-3">{patient.room?.roomNumber || "N/A"}</td>
                    <td className="p-3">{patient.report?.reportId || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchAllPatient;
