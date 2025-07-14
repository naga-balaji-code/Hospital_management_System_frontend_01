import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const FetchAllOwner = () => {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fetchAllOwner");
      if (res.data.length === 0) {
        toast.error("No owners found.");
      } else {
        setOwners(res.data);
        toast.success("Owners fetched successfully!");
      }
    } catch (err) {
      toast.error("Error fetching owners.");
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
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          All Owners
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchOwners}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Owners
          </button>
        </div>

        {owners.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Owner Name</th>
                  <th className="p-3">Net Worth</th>
                  <th className="p-3">Hospital Name</th>
                  <th className="p-3">Hospital Phone</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{owner.ownerName}</td>
                    <td className="p-3">₹{owner.ownerNetworth}</td>
                    <td className="p-3">
                      {owner.hospital?.hospitalName || "N/A"}
                    </td>
                    <td className="p-3">
                      {owner.hospital?.hospitalPhone || "N/A"}
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

export default FetchAllOwner;
