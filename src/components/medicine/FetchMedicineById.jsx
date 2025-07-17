
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdNumbers } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const FetchMedicineById = () => {
  const [medicineId, setMedicineId] = useState("");
  const [medicine, setMedicine] = useState(null);

  const fetchMedicine = async () => {
    if (!medicineId || isNaN(medicineId)) {
      toast.error("Enter a valid Medicine ID");
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/fetchMedicineById?medicineId=${medicineId}`
      );
      setMedicine(res.data);
      toast.success("Medicine fetched successfully!");
    } catch (err) {
      setMedicine(null);
      toast.error("Medicine not found.");
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
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          Fetch Medicine by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Medicine ID"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-500 transition"
            />
          </div>
          <button
            onClick={fetchMedicine}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch
          </button>
        </div>

        {medicine && (
          <div className="bg-gray-100 p-4 rounded-md shadow text-sm space-y-2">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Medicine Details
            </h3>
            <p><strong>Name:</strong> {medicine.medicineName}</p>
            <p><strong>Price:</strong> ₹{medicine.medicinePrice}</p>
            <p><strong>Dose:</strong> {medicine.medicineDose}</p>
            <p><strong>Type:</strong> {medicine.medicineType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchMedicineById;
