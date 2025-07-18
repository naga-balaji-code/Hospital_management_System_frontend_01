
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdAttachMoney, MdNumbers, MdPerson } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const UpdateOwnerById = () => {
  const [ownerId, setOwnerId] = useState("");
  const [owner, setOwner] = useState({
    ownerName: "",
    ownerNetworth: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!owner.ownerName) err.ownerName = "Owner name is required";
    if (!owner.ownerNetworth || isNaN(owner.ownerNetworth))
      err.ownerNetworth = "Valid net worth required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ownerId || isNaN(ownerId)) {
      toast.error("Enter valid Owner ID");
      return;
    }

    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      await axiosInstance.put(
        `/updateOwnerById?oldOwnerId=${ownerId}`,
        owner
      );
      toast.success("Owner updated successfully!");
      setOwnerId("");
      setOwner({ ownerName: "", ownerNetworth: "" });
    } catch (err) {
      toast.error("Failed to update owner.");
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
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Update Owner
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Owner ID */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Owner ID"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Owner Name */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={owner.ownerName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm">{errors.ownerName}</p>
            )}
          </div>

          {/* Net Worth */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="ownerNetworth"
              placeholder="Net Worth"
              value={owner.ownerNetworth}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.ownerNetworth && (
              <p className="text-red-500 text-sm">{errors.ownerNetworth}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update Owner
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOwnerById;
