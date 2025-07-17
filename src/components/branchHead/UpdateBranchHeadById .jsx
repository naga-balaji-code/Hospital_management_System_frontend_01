
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAttachMoney,
  MdEmail,
  MdNumbers,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const UpdateBranchHeadById = () => {
  const [oldBranchHeadId, setOldBranchHeadId] = useState("");
  const [branchHead, setBranchHead] = useState({
    branchheadName: "",
    branchheadEmail: "",
    branchheadPhone: "",
    branchheadSalary: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!branchHead.branchheadName) newErrors.branchheadName = "Name is required";
    if (!branchHead.branchheadEmail || !branchHead.branchheadEmail.includes("@"))
      newErrors.branchheadEmail = "Valid email is required";
    if (!branchHead.branchheadPhone || branchHead.branchheadPhone.length < 10)
      newErrors.branchheadPhone = "Valid phone number required";
    if (!branchHead.branchheadSalary || branchHead.branchheadSalary <= 0)
      newErrors.branchheadSalary = "Valid salary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchHead((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!oldBranchHeadId || isNaN(oldBranchHeadId)) {
      toast.error("Enter a valid Branch Head ID");
      return;
    }
    if (!validate()) {
      toast.error("Please fix the form errors.");
      return;
    }

    try {
      await axiosInstance.put(
        `/updateBranchHeadById?oldBranchHeadId=${oldBranchHeadId}`,
        branchHead
      );
      toast.success("Branch Head updated successfully!");
      setBranchHead({
        branchheadName: "",
        branchheadEmail: "",
        branchheadPhone: "",
        branchheadSalary: "",
      });
      setOldBranchHeadId("");
    } catch (err) {
      toast.error("Failed to update Branch Head.");
    }
  };

  const inputStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500";

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
          Update Branch Head
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Branch Head ID */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              name="oldBranchHeadId"
              placeholder="Enter Branch Head ID"
              value={oldBranchHeadId}
              onChange={(e) => setOldBranchHeadId(e.target.value)}
              className={inputStyle}
              type="number"
            />
          </div>

          {/* Name */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadName"
              placeholder="Name"
              value={branchHead.branchheadName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.branchheadName && <p className="text-red-500 text-sm">{errors.branchheadName}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadEmail"
              placeholder="Email"
              value={branchHead.branchheadEmail}
              onChange={handleChange}
              className={inputStyle}
              type="email"
            />
            {errors.branchheadEmail && <p className="text-red-500 text-sm">{errors.branchheadEmail}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadPhone"
              placeholder="Phone"
              value={branchHead.branchheadPhone}
              onChange={handleChange}
              className={inputStyle}
              type="number"
            />
            {errors.branchheadPhone && <p className="text-red-500 text-sm">{errors.branchheadPhone}</p>}
          </div>

          {/* Salary */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadSalary"
              placeholder="Salary"
              value={branchHead.branchheadSalary}
              onChange={handleChange}
              className={inputStyle}
              type="number"
            />
            {errors.branchheadSalary && <p className="text-red-500 text-sm">{errors.branchheadSalary}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBranchHeadById;
