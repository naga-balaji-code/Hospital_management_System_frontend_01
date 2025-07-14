import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdNumbers } from "react-icons/md";

const FetchBranchHeadById = () => {
  const [branchHeadId, setBranchHeadId] = useState("");
  const [branchHead, setBranchHead] = useState(null);

  const fetchBranchHead = async () => {
    if (!branchHeadId || isNaN(branchHeadId)) {
      toast.error("Enter a valid Branch Head ID");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/fetchBranchHeadById?branchHeadId=${branchHeadId}`);
      setBranchHead(res.data);
      toast.success("Branch Head data fetched successfully!");
    } catch (err) {
      setBranchHead(null);
      toast.error("Branch Head not found");
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
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Fetch Branch Head by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Branch Head ID"
              value={branchHeadId}
              onChange={(e) => setBranchHeadId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition"
            />
          </div>
          <button
            onClick={fetchBranchHead}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Fetch
          </button>
        </div>

        {branchHead && (
          <div className="bg-gray-100 p-4 rounded-md shadow text-sm space-y-2">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Branch Head Details
            </h3>
            <p><strong>Name:</strong> {branchHead.branchheadName}</p>
            <p><strong>Email:</strong> {branchHead.branchheadEmail}</p>
            <p><strong>Phone:</strong> {branchHead.branchheadPhone}</p>
            <p><strong>Salary:</strong> ₹{branchHead.branchheadSalary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchBranchHeadById;