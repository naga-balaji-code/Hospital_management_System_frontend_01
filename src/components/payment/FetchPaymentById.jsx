
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdNumbers } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const FetchPaymentById = () => {
  const [paymentId, setPaymentId] = useState("");
  const [payment, setPayment] = useState(null);

  const fetchPayment = async () => {
    if (!paymentId || isNaN(paymentId)) {
      toast.error("Please enter a valid Payment ID");
      return;
    }

    try {
      const res = await axiosInstance.get(`/fetchPaymentById?paymentId=${paymentId}`);
      setPayment(res.data);
      toast.success("Payment fetched successfully!");
    } catch (err) {
      setPayment(null);
      toast.error("Payment not found.");
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
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Fetch Payment by ID
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Enter Payment ID"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition"
            />
          </div>

          <button
            onClick={fetchPayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch
          </button>
        </div>

        {payment && (
          <div className="bg-gray-100 p-4 rounded-md shadow text-sm space-y-2">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Payment Details
            </h3>
            <p><strong>Type:</strong> {payment.paymentType}</p>
            <p><strong>Amount:</strong> ₹{payment.paymentAmount}</p>
            <p><strong>Status:</strong> {payment.paymentStatus}</p>
            <p><strong>Date:</strong> {payment.paymentDate}</p>
            <p><strong>Time:</strong> {payment.paymentTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchPaymentById;
