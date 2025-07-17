
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdEmail,
  MdHomeWork,
  MdLocationOn,
  MdNumbers,
  MdOutlineDomain,
  MdPhone,
  MdPlace,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SaveBranch = () => {
  const [branch, setBranch] = useState({
    branchName: "",
    branchPhone: "",
    branchEmail: "",
    address: {
      addressPlotNumber: "",
      addressCity: "",
      addressLandMark: "",
      addressPincode: "",
      addressState: "",
    },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!branch.branchName) newErrors.branchName = "Branch name is required";
    if (!branch.branchPhone || branch.branchPhone.length < 10)
      newErrors.branchPhone = "Valid phone number is required";
    if (!branch.branchEmail || !branch.branchEmail.includes("@"))
      newErrors.branchEmail = "Valid email is required";

    const addr = branch.address;
    if (!addr.addressPlotNumber) newErrors.addressPlotNumber = "Plot number required";
    if (!addr.addressCity) newErrors.addressCity = "City is required";
    if (!addr.addressLandMark) newErrors.addressLandMark = "Landmark required";
    if (!addr.addressPincode || !/^\d{6}$/.test(addr.addressPincode))
      newErrors.addressPincode = "6-digit pincode required";
    if (!addr.addressState) newErrors.addressState = "State required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setBranch((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setBranch((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the form errors.");
      return;
    }

    try {
      await axiosInstance.post("/saveBranch", branch);
      toast.success("Branch saved successfully!");
      setBranch({
        branchName: "",
        branchPhone: "",
        branchEmail: "",
        address: {
          addressPlotNumber: "",
          addressCity: "",
          addressLandMark: "",
          addressPincode: "",
          addressState: "",
        },
      });
    } catch (err) {
      toast.error("Error saving branch. Check server.");
    }
  };

  const inputBaseStyle =
    "pl-10 p-2 w-full rounded-md border border-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 hover:border-blue-500";

  return (
    <div
       className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}
    >
      <Toaster position="top-center" />
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Create New Branch</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BRANCH INFO */}
          <div className="relative">
            <MdOutlineDomain className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchName"
              placeholder="Branch Name"
              value={branch.branchName}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName}</p>}
          </div>

          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchPhone"
              placeholder="Branch Phone"
              value={branch.branchPhone}
              onChange={handleChange}
              className={inputBaseStyle}
              type="number"
            />
            {errors.branchPhone && <p className="text-red-500 text-sm">{errors.branchPhone}</p>}
          </div>

          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-gray-500" />
            <input
              name="branchEmail"
              placeholder="Branch Email"
              value={branch.branchEmail}
              onChange={handleChange}
              className={inputBaseStyle}
              type="email"
            />
            {errors.branchEmail && <p className="text-red-500 text-sm">{errors.branchEmail}</p>}
          </div>

          {/* ADDRESS INFO */}
          <div className="relative">
            <MdHomeWork className="absolute top-3 left-3 text-gray-500" />
            <input
              name="address.addressPlotNumber"
              placeholder="Plot Number"
              value={branch.address.addressPlotNumber}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            {errors.addressPlotNumber && <p className="text-red-500 text-sm">{errors.addressPlotNumber}</p>}
          </div>

          <div className="relative">
            <MdPlace className="absolute top-3 left-3 text-gray-500" />
            <input
              name="address.addressCity"
              placeholder="City"
              value={branch.address.addressCity}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            {errors.addressCity && <p className="text-red-500 text-sm">{errors.addressCity}</p>}
          </div>

          <div className="relative">
            <MdLocationOn className="absolute top-3 left-3 text-gray-500" />
            <input
              name="address.addressLandMark"
              placeholder="Landmark"
              value={branch.address.addressLandMark}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            {errors.addressLandMark && <p className="text-red-500 text-sm">{errors.addressLandMark}</p>}
          </div>

          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              name="address.addressPincode"
              placeholder="Pincode"
              value={branch.address.addressPincode}
              onChange={handleChange}
              className={inputBaseStyle}
              type="number"
            />
            {errors.addressPincode && <p className="text-red-500 text-sm">{errors.addressPincode}</p>}
          </div>

          <div className="relative">
            <MdHomeWork className="absolute top-3 left-3 text-gray-500" />
            <input
              name="address.addressState"
              placeholder="State"
              value={branch.address.addressState}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            {errors.addressState && <p className="text-red-500 text-sm">{errors.addressState}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-200"
            >
              Save Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveBranch;