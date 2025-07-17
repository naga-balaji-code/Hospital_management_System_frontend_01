
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdBedroomParent,
  MdHotel,
  MdOutlineAttachMoney,
  MdPeople,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SaveRoom = () => {
  const [room, setRoom] = useState({
    roomNumber: "",
    roomPrice: "",
    roomType: "",
    roomCapacity: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!room.roomNumber) err.roomNumber = "Room number is required";
    if (!room.roomPrice) err.roomPrice = "Room price is required";
    if (!room.roomType) err.roomType = "Room type is required";
    if (!room.roomCapacity) err.roomCapacity = "Room capacity is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      await axiosInstance.post("/saveRoom", room);
      toast.success("Room saved successfully!");
      setRoom({
        roomNumber: "",
        roomPrice: "",
        roomType: "",
        roomCapacity: "",
      });
    } catch (error) {
      toast.error("Failed to save room.");
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
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Save Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Number */}
          <div className="relative">
            <MdHotel className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="roomNumber"
              placeholder="Room Number"
              value={room.roomNumber}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.roomNumber && (
              <p className="text-red-500 text-sm">{errors.roomNumber}</p>
            )}
          </div>

          {/* Room Price */}
          <div className="relative">
            <MdOutlineAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="roomPrice"
              placeholder="Room Price"
              value={room.roomPrice}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.roomPrice && (
              <p className="text-red-500 text-sm">{errors.roomPrice}</p>
            )}
          </div>

          {/* Room Type */}
          <div className="relative">
            <MdBedroomParent className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="roomType"
              placeholder="Room Type (e.g. ICU, General)"
              value={room.roomType}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.roomType && (
              <p className="text-red-500 text-sm">{errors.roomType}</p>
            )}
          </div>

          {/* Room Capacity */}
          <div className="relative">
            <MdPeople className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="roomCapacity"
              placeholder="Room Capacity"
              value={room.roomCapacity}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.roomCapacity && (
              <p className="text-red-500 text-sm">{errors.roomCapacity}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveRoom;
