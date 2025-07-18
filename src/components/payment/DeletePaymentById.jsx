
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdDelete, MdNumbers } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const DeletePaymentById = () => {
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!paymentId || isNaN(paymentId)) {
      toast.error("Enter a valid Payment ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.delete(
        `/deletePaymentById?paymentId=${paymentId}`
      );

      // ✅ Backend sends ResponseStructure with message
      toast.success(res.data?.message || "Payment deleted successfully!");

      setPaymentId(""); // reset input after successful delete
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message); // show backend error
      } else {
        toast.error("Failed to delete payment. Please try again.");
      }
    } finally {
      setLoading(false);
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
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">
          Delete Payment by ID
        </h2>

        {/* ✅ ID Input */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Payment ID"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-500 transition"
            />
          </div>

          {/* ✅ Delete Button */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition flex items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <MdDelete />
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePaymentById;
