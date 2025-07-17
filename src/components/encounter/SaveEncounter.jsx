
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAccessTime,
  MdDateRange,
  MdEventNote,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SaveEncounter = () => {
  const [encounter, setEncounter] = useState({
    encounterType: "",
    encounterDate: "",
    encounterTime: "",
    encounterStatus: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!encounter.encounterType) err.encounterType = "Type is required";
    if (!encounter.encounterDate) err.encounterDate = "Date is required";
    if (!encounter.encounterTime) err.encounterTime = "Time is required";
    if (!encounter.encounterStatus) err.encounterStatus = "Status is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncounter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      await axiosInstance.post("/saveEncounter", encounter);
      toast.success("Encounter saved successfully!");
      setEncounter({
        encounterType: "",
        encounterDate: "",
        encounterTime: "",
        encounterStatus: "",
      });
    } catch (err) {
      toast.error("Failed to save encounter.");
    }
  };

  const inputStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition";

  return (
    <div
       className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveEncounter;