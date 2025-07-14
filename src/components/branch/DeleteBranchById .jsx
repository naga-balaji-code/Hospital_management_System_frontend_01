import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdNumbers } from "react-icons/md";

const DeleteBranchById = () => {
  const [branchId, setBranchId] = useState("");

  const handleDelete = async () => {
    if (!branchId || isNaN(branchId)) {
      toast.error("Please enter a valid Branch ID");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/deleteBranchById?branchId=${branchId}`);
      toast.success("Branch deleted successfully!");
      setBranchId("");
    } catch (err) {
      toast.error("Branch not found or already deleted");
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
          Delete Branch by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Branch ID"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-500 transition"
            />
          </div>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            <div className="flex items-center gap-2">
              <MdDelete />
              Delete
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBranchById;