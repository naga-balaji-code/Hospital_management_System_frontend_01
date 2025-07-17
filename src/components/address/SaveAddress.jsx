
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FaCity,
  FaLandmark,
  FaMap,
  FaMapMarkerAlt,
  FaMapPin,
} from "react-icons/fa";
import axiosInstance from "../axiosInstance/Instance";

const SaveAddress= () => {
  const [address, setAddress] = useState({
    addressPlotNumber: "",
    addressCity: "",
    addressLandMark: "", 
    addressPincode: "",
    addressState: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!address.addressPlotNumber.trim()) newErrors.addressPlotNumber = "Plot number is required";
    if (!address.addressCity.trim()) newErrors.addressCity = "City is required";
    if (!address.addressLandMark.trim()) newErrors.addressLandMark = "Landmark is required";
    if (!address.addressPincode || address.addressPincode.toString().length !== 6) {
      newErrors.addressPincode = "Valid 6-digit pincode required";
    }
    if (!address.addressState.trim()) newErrors.addressState = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    try {
      await axiosInstance.post("/saveAddress", address);
      toast.success("Address saved successfully!");
      setAddress({
        addressPlotNumber: "",
        addressCity: "",
        addressLandMark: "",
        addressPincode: "",
        addressState: "",
      });
    } catch (err) {
      toast.error("Failed to save address.");
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
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Save Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plot Number */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="addressPlotNumber"
              placeholder="Plot Number"
              value={address.addressPlotNumber}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.addressPlotNumber && (
              <p className="text-red-500 text-sm">{errors.addressPlotNumber}</p>
            )}
          </div>

          {/* City */}
          <div className="relative">
            <FaCity className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="addressCity"
              placeholder="City"
              value={address.addressCity}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.addressCity && (
              <p className="text-red-500 text-sm">{errors.addressCity}</p>
            )}
          </div>

          {/* Landmark */}
          <div className="relative">
            <FaLandmark className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="addressLandMark"
              placeholder="Landmark"
              value={address.addressLandMark}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.addressLandMark && (
              <p className="text-red-500 text-sm">{errors.addressLandMark}</p>
            )}
          </div>

          {/* Pincode */}
          <div className="relative">
            <FaMapPin className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="addressPincode"
              placeholder="Pincode"
              value={address.addressPincode}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.addressPincode && (
              <p className="text-red-500 text-sm">{errors.addressPincode}</p>
            )}
          </div>

          {/* State */}
          <div className="relative">
            <FaMap className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="addressState"
              placeholder="State"
              value={address.addressState}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.addressState && (
              <p className="text-red-500 text-sm">{errors.addressState}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveAddress;
