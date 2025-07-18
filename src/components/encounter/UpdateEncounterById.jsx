import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAccessTime,
  MdDateRange,
  MdEventNote,
  MdNumbers,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const UpdateEncounterById = () => {
  const [encounterId, setEncounterId] = useState("");
  const [encounter, setEncounter] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch encounter details before editing
  const fetchEncounterById = async () => {
    if (!encounterId || isNaN(encounterId)) {
      toast.error("Please enter a valid Encounter ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/fetchEncounterById?encounterId=${encounterId}`
      );

      // ✅ Extract encounter data from ResponseStructure
      if (res.data?.data) {
        setEncounter(res.data.data);
        toast.success("Encounter details loaded!");
      } else {
        toast.error("Encounter not found!");
        setEncounter(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch encounter details.");
      setEncounter(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Validation
  const validate = () => {
    const err = {};
    if (!encounter?.encounterType) err.encounterType = "Type is required";
    if (!encounter?.encounterDate) err.encounterDate = "Date is required";
    if (!encounter?.encounterTime) err.encounterTime = "Time is required";
    if (!encounter?.encounterStatus) err.encounterStatus = "Status is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncounter((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit updated encounter
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!encounterId || isNaN(encounterId)) {
      toast.error("Enter a valid Encounter ID first");
      return;
    }

    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      const res = await axiosInstance.put(
        `/updateEncounterbyId?oldEncounterId=${encounterId}`,
        encounter
      );

      toast.success(res.data?.message || "Encounter updated successfully!");
      setEncounter(null);
      setEncounterId("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update encounter.");
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
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
          Update Encounter by ID
        </h2>

        {/* ✅ Enter ID & Fetch */}
        <div className="flex gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Encounter ID"
              value={encounterId}
              onChange={(e) => setEncounterId(e.target.value)}
              className={inputStyle}
            />
          </div>

          <button
            onClick={fetchEncounterById}
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>

        {/* ✅ Only show form if encounter is fetched */}
        {encounter && (
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Type */}
            <div className="relative">
              <MdEventNote className="absolute top-3 left-3 text-gray-500" />
              <input
                name="encounterType"
                placeholder="Encounter Type"
                value={encounter.encounterType || ""}
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
                value={encounter.encounterDate || ""}
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
                value={encounter.encounterTime || ""}
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
                value={encounter.encounterStatus || ""}
                onChange={handleChange}
                className={inputStyle}
              />
              {errors.encounterStatus && (
                <p className="text-red-500 text-sm">{errors.encounterStatus}</p>
              )}
            </div>

            {/* ✅ Update Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Update Encounter
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateEncounterById;
