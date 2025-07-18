import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance/Instance";

const FetchAllEncounter = () => {
  const [encounters, setEncounters] = useState([]);

  const fetchAllEncounters = async () => {
    try {
      const res = await axiosInstance.get("/fetchAllEncounter");

      if (!res.data || res.data.length === 0) {
        toast.error("No encounters found.");
        return;
      }

      setEncounters(res.data);
      toast.success("Encounters fetched successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch encounters.");
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
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
          All Encounters
        </h2>

        {/* ✅ Fetch Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={fetchAllEncounters}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Encounters
          </button>
        </div>

        {/* ✅ Display Table */}
        {encounters.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Patient Email</th>
                </tr>
              </thead>
              <tbody>
                {encounters.map((encounter, index) => (
                  <tr
                    key={encounter.encounterId || index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{encounter.encounterType}</td>
                    <td className="p-3">{encounter.encounterDate}</td>
                    <td className="p-3">{encounter.encounterTime}</td>
                    <td className="p-3">{encounter.encounterStatus}</td>

                    {/* ✅ Show Patient details if present */}
                    <td className="p-3">
                      {encounter.patient
                        ? encounter.patient.patientName
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      {encounter.patient
                        ? encounter.patient.patientEmail
                        : "N/A"}
                    </td>
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

export default FetchAllEncounter;
