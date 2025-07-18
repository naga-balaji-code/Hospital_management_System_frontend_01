
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAttachMoney,
  MdEmail,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SaveBranchHead = () => {
  const [branchHead, setBranchHead] = useState({
    branchHeadName: "",
    branchHeadEmail: "",
    branchHeadPhone: "",
    branchHeadSalary: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!branchHead.branchHeadName) newErrors.branchHeadName = "Name is required";
    if (!branchHead.branchHeadEmail || !branchHead.branchHeadEmail.includes("@"))
      newErrors.branchHeadEmail = "Valid email is required";
    if (!branchHead.branchHeadPhone || branchHead.branchHeadPhone.length < 10)
      newErrors.branchHeadPhone = "Valid phone number is required";
    if (!branchHead.branchHeadSalary || branchHead.branchHeadSalary <= 0)
      newErrors.branchHeadSalary = "Valid salary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchHead((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors.");
      return;
    }

    try {
      await axiosInstance.post("/saveBranchHead", branchHead);
      toast.success("Branch Head saved successfully!");
      setBranchHead({
        branchHeadName: "",
        branchHeadEmail: "",
        branchHeadPhone: "",
        branchHeadSalary: "",
      });
    } catch (err) {
      toast.error("Failed to save Branch Head.");
    }
  };

  const inputStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition";

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
          Save Branch Head
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchHeadName"
              placeholder="Name"
              value={branchHead.branchHeadName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.branchheadName && <p className="text-red-500 text-sm">{errors.branchHeadName}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadEmail"
              placeholder="Email"
              value={branchHead.branchHeadEmail}
              onChange={handleChange}
              className={inputStyle}
              type="email"
            />
            {errors.branchHeadEmail && <p className="text-red-500 text-sm">{errors.branchHeadEmail}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchHeadPhone"
              placeholder="Phone"
              value={branchHead.branchHeadPhone}
              onChange={handleChange}
              className={inputStyle}
              type="number"
            />
            {errors.branchHeadPhone && <p className="text-red-500 text-sm">{errors.branchHeadPhone}</p>}
          </div>

          {/* Salary */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchheadSalary"
              placeholder="Salary"
              value={branchHead.branchHeadSalary}
              onChange={handleChange}
              className={inputStyle}
              type="number"
            />
            {errors.branchHeadSalary && <p className="text-red-500 text-sm">{errors.branchHeadSalary}</p>}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveBranchHead;