
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAttachMoney,
  MdCategory,
  MdMedicalServices,
  MdNumbers,
  MdOpacity,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const UpdateMedicineById = () => {
  const [medicineId, setMedicineId] = useState("");
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicinePrice: "",
    medicineDose: "",
    medicineType: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!medicine.medicineName) err.medicineName = "Name is required";
    if (!medicine.medicinePrice || isNaN(medicine.medicinePrice))
      err.medicinePrice = "Valid price required";
    if (!medicine.medicineDose) err.medicineDose = "Dose is required";
    if (!medicine.medicineType) err.medicineType = "Type is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!medicineId || isNaN(medicineId)) {
      toast.error("Enter valid Medicine ID");
      return;
    }

    if (!validate()) {
      toast.error("Please fix validation errors.");
      return;
    }

    try {
      await axiosInstance.put(
        `/updateMedicineById?oldMedicineId=${medicineId}`,
        medicine
      );
      toast.success("Medicine updated successfully!");
      setMedicineId("");
      setMedicine({
        medicineName: "",
        medicinePrice: "",
        medicineDose: "",
        medicineType: "",
      });
    } catch (err) {
      toast.error("Failed to update medicine.");
    }
  };

  const inputStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-500 transition";

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
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Update Medicine
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* ID */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Medicine ID"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Name */}
          <div className="relative">
            <MdMedicalServices className="absolute top-3 left-3 text-gray-500" />
            <input
              name="medicineName"
              placeholder="Medicine Name"
              value={medicine.medicineName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.medicineName && (
              <p className="text-red-500 text-sm">{errors.medicineName}</p>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              name="medicinePrice"
              type="number"
              placeholder="Price"
              value={medicine.medicinePrice}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.medicinePrice && (
              <p className="text-red-500 text-sm">{errors.medicinePrice}</p>
            )}
          </div>

          {/* Dose */}
          <div className="relative">
            <MdOpacity className="absolute top-3 left-3 text-gray-500" />
            <input
              name="medicineDose"
              placeholder="Dose"
              value={medicine.medicineDose}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.medicineDose && (
              <p className="text-red-500 text-sm">{errors.medicineDose}</p>
            )}
          </div>

          {/* Type */}
          <div className="relative">
            <MdCategory className="absolute top-3 left-3 text-gray-500" />
            <input
              name="medicineType"
              placeholder="Type"
              value={medicine.medicineType}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.medicineType && (
              <p className="text-red-500 text-sm">{errors.medicineType}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicineById;
