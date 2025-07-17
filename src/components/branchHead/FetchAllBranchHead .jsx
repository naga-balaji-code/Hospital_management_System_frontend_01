
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance/Instance";

const FetchAllBranchHead = () => {
  const [branchHeads, setBranchHeads] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axiosInstance.get("/fetchAllBranchHead");
      if (res.data.length === 0) {
        toast.error("No branch heads found.");
      } else {
        setBranchHeads(res.data);
        toast.success("Branch Heads loaded successfully!");
      }
    } catch (err) {
      toast.error("Error fetching branch heads.");
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
          All Branch Heads
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchAll}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Branch Heads
          </button>
        </div>

        {branchHeads.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Salary (₹)</th>
                </tr>
              </thead>
              <tbody>
                {branchHeads.map((head, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{head.branchheadName}</td>
                    <td className="p-3">{head.branchheadEmail}</td>
                    <td className="p-3">{head.branchheadPhone}</td>
                    <td className="p-3">₹{head.branchheadSalary}</td>
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

export default FetchAllBranchHead