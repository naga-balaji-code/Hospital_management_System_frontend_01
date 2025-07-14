import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdNumbers } from "react-icons/md";

const FetchPatientById = () => {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);

  const fetchPatient = async () => {
    if (!patientId || isNaN(patientId)) {
      toast.error("Please enter a valid Patient ID");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/fetchPatientById?patientId=${patientId}`);
      setPatient(res.data);
      toast.success("Patient fetched successfully!");
    } catch (err) {
      setPatient(null);
      toast.error("Patient not found.");
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
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Fetch Patient by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition"
            />
          </div>

          <button
            onClick={fetchPatient}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch
          </button>
        </div>

        {patient && (
          <div className="bg-gray-100 p-4 rounded-md shadow text-sm space-y-2">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Patient Details
            </h3>
            <p><strong>Name:</strong> {patient.patientName}</p>
            <p><strong>Age:</strong> {patient.patientAge}</p>
            <p><strong>Gender:</strong> {patient.patientGender}</p>
            <p><strong>Email:</strong> {patient.patientEmail}</p>
            <p><strong>Phone:</strong> {patient.patientPhone}</p>
            {patient.room && (
              <>
                <p><strong>Room:</strong> {patient.room.roomNumber || "N/A"}</p>
              </>
            )}
            {patient.report && (
              <>
                <p><strong>Report ID:</strong> {patient.report.reportId || "N/A"}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchPatientById;
