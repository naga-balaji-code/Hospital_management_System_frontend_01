import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const FetchAllBranch = () => {
  const [branches, setBranches] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fetchAllBranch");
      if (res.data.length === 0) {
        toast.error("No branches found.");
      } else {
        setBranches(res.data);
        toast.success("Branches loaded successfully!");
      }
    } catch (err) {
      toast.error("Error fetching branches.");
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
          All Branches
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchAll}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Branches
          </button>
        </div>

        {branches.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">City</th>
                  <th className="p-3">State</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, index) => (
                  <tr
                    key={branch.branchId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{branch.branchId}</td>
                    <td className="p-3">{branch.branchName}</td>
                    <td className="p-3">{branch.branchPhone}</td>
                    <td className="p-3">{branch.branchEmail}</td>
                    <td className="p-3">{branch.address?.addressCity}</td>
                    <td className="p-3">{branch.address?.addressState}</td>
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

export default FetchAllBranch;