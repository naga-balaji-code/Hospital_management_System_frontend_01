import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const FetchAllMedicine = () => {
  const [medicines, setMedicines] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/fetchAllMedicine");
      if (res.data.length === 0) {
        toast.error("No medicines found.");
      } else {
        setMedicines(res.data);
        toast.success("Medicines fetched successfully!");
      }
    } catch (err) {
      toast.error("Error fetching medicines.");
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
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          All Medicines
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchAll}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Medicines
          </button>
        </div>

        {medicines.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Dose</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-green-50 transition`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{med.medicineName}</td>
                    <td className="p-3">₹{med.medicinePrice}</td>
                    <td className="p-3">{med.medicineDose}</td>
                    <td className="p-3">{med.medicineType}</td>
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

export default FetchAllMedicine;
