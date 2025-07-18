
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdNumbers } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const DeleteEncounterById = () => {
  const [encounterId, setEncounterId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!encounterId || isNaN(encounterId)) {
      toast.error("Please enter a valid Encounter ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.delete(
        `/deleteEncounterById?encounterId=${encounterId}`
      );

      // ✅ Show backend message if available
      if (res.data?.message) {
        toast.success(res.data.message);
      } else {
        toast.success("Encounter deleted successfully!");
      }

      setEncounterId(""); // ✅ Reset input field
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to delete encounter. Check ID and try again."
      );
    } finally {
      setLoading(false);
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
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Delete Encounter by ID
        </h2>

        {/* ✅ Input & Delete Button */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Encounter ID"
              value={encounterId}
              onChange={(e) => setEncounterId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-500 transition"
            />
          </div>

          <button
            onClick={handleDelete}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-semibold transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
          >
            <MdDelete />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEncounterById;
