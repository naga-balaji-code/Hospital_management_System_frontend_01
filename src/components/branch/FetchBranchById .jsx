import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdNumbers } from "react-icons/md";

const FetchBranchById = () => {
  const [branchId, setBranchId] = useState("");
  const [branch, setBranch] = useState(null);

  const handleFetch = async () => {
    if (!branchId || isNaN(branchId)) {
      toast.error("Please enter a valid Branch ID");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/fetchBranchById?branchId=${branchId}`
      );
      setBranch(response.data);
      toast.success("Branch fetched successfully");
    } catch (err) {
      setBranch(null);
      toast.error("Branch not found");
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
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Fetch Branch by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Branch ID"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition"
            />
          </div>
          <button
            onClick={handleFetch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Fetch
          </button>
        </div>

        {branch && (
          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Branch Details</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li><strong>Name:</strong> {branch.branchName}</li>
              <li><strong>Phone:</strong> {branch.branchPhone}</li>
              <li><strong>Email:</strong> {branch.branchEmail}</li>
              <li><strong>Plot:</strong> {branch.address?.addressPlotNumber}</li>
              <li><strong>City:</strong> {branch.address?.addressCity}</li>
              <li><strong>Landmark:</strong> {branch.address?.addressLandMark}</li>
              <li><strong>Pincode:</strong> {branch.address?.addressPincode}</li>
              <li><strong>State:</strong> {branch.address?.addressState}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchBranchById;