import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAccessTime,
  MdDateRange,
  MdEventNote,
  MdOutlinePublishedWithChanges,
  MdPerson,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SaveEncounter = () => {
  const [encounter, setEncounter] = useState({
    encounterType: "",
    encounterDate: "",
    encounterTime: "",
    encounterStatus: "",
    patientId: "",
  });

  const [errors, setErrors] = useState({});
  const [patients, setPatients] = useState([]);
  const [savedEncounters, setSavedEncounters] = useState([]);

  // ✅ Fetch all patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axiosInstance.get("/fetchAllPatient");
        setPatients(res.data);
      } catch (err) {
        toast.error("Failed to load patients");
      }
    };
    fetchPatients();
  }, []);

  // ✅ Validate form
  const validate = () => {
    const err = {};
    if (!encounter.encounterType) err.encounterType = "Type is required";
    if (!encounter.encounterDate) err.encounterDate = "Date is required";
    if (!encounter.encounterTime) err.encounterTime = "Time is required";
    if (!encounter.encounterStatus) err.encounterStatus = "Status is required";
    if (!encounter.patientId) err.patientId = "Please select a patient";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncounter((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit encounter
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    // ✅ Nested JSON for backend
    const payload = {
      encounterType: encounter.encounterType,
      encounterDate: encounter.encounterDate,
      encounterTime: encounter.encounterTime,
      encounterStatus: encounter.encounterStatus,
      patient: { patientId: encounter.patientId },
    };

    try {
      const res = await axiosInstance.post("/saveEncounter", payload);
      toast.success("Encounter saved successfully!");

      // ✅ Reset form
      setEncounter({
        encounterType: "",
        encounterDate: "",
        encounterTime: "",
        encounterStatus: "",
        patientId: "",
      });

      // ✅ Add saved encounter to table
      setSavedEncounters((prev) => [...prev, res.data]);
    } catch (err) {
      toast.error("Failed to save encounter.");
    }
  };

  const inputStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}
    >
      <Toaster position="top-center" />
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Save Encounter
        </h2>

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div className="relative">
            <MdEventNote className="absolute top-3 left-3 text-gray-500" />
            <input
              name="encounterType"
              placeholder="Encounter Type"
              value={encounter.encounterType}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.encounterType && (
              <p className="text-red-500 text-sm">{errors.encounterType}</p>
            )}
          </div>

          {/* Date */}
          <div className="relative">
            <MdDateRange className="absolute top-3 left-3 text-gray-500" />
            <input
              name="encounterDate"
              type="date"
              value={encounter.encounterDate}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.encounterDate && (
              <p className="text-red-500 text-sm">{errors.encounterDate}</p>
            )}
          </div>

          {/* Time */}
          <div className="relative">
            <MdAccessTime className="absolute top-3 left-3 text-gray-500" />
            <input
              name="encounterTime"
              type="time"
              value={encounter.encounterTime}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.encounterTime && (
              <p className="text-red-500 text-sm">{errors.encounterTime}</p>
            )}
          </div>

          {/* Status */}
          <div className="relative">
            <MdOutlinePublishedWithChanges className="absolute top-3 left-3 text-gray-500" />
            <input
              name="encounterStatus"
              placeholder="Encounter Status"
              value={encounter.encounterStatus}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.encounterStatus && (
              <p className="text-red-500 text-sm">{errors.encounterStatus}</p>
            )}
          </div>

          {/* ✅ Select Patient */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <select
              name="patientId"
              value={encounter.patientId}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.patientId} value={p.patientId}>
                  {p.patientName} ({p.patientEmail})
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="text-red-500 text-sm">{errors.patientId}</p>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save Encounter
          </button>
        </form>
      </div>

      {/* ✅ TABLE OF SAVED ENCOUNTERS */}
      {savedEncounters.length > 0 && (
        <div className="bg-white bg-opacity-90 mt-8 p-6 rounded-xl shadow-xl w-full max-w-4xl">
          <h3 className="text-xl font-bold text-center text-blue-800 mb-4">
            Saved Encounters
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Patient</th>
                </tr>
              </thead>
              <tbody>
                {savedEncounters.map((enc, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{enc.encounterType}</td>
                    <td className="p-3">{enc.encounterDate}</td>
                    <td className="p-3">{enc.encounterTime}</td>
                    <td className="p-3">{enc.encounterStatus}</td>
                    <td className="p-3">
                      {enc.patient?.patientName || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveEncounter;
