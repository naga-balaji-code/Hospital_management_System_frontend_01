
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../axiosInstance/Instance";

const FetchAllPayments = () => {
  const [payments, setPayments] = useState([]);

  // ✅ Fetch all payments from backend
  const fetchAllPayments = async () => {
    try {
      const response = await axiosInstance.get("/fetchAllPayment");

      if (!response.data || response.data.length === 0) {
        toast.error("No payments found.");
        setPayments([]);
      } else {
        setPayments(response.data);
        toast.success("Payments fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments. Check backend logs.");
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
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">
          All Payments
        </h2>

        {/* ✅ Fetch Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchAllPayments}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Fetch All Payments
          </button>
        </div>

        {/* ✅ No Payments Message */}
        {payments.length === 0 && (
          <p className="text-center text-gray-600">
            Click <strong>Fetch All Payments</strong> to load payment records.
          </p>
        )}

        {/* ✅ Payments Table */}
        {payments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse border border-gray-200">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-3 border border-gray-300">#</th>
                  <th className="p-3 border border-gray-300">Payment Type</th>
                  <th className="p-3 border border-gray-300">Amount (₹)</th>
                  <th className="p-3 border border-gray-300">Status</th>
                  <th className="p-3 border border-gray-300">Date</th>
                  <th className="p-3 border border-gray-300">Time</th>
                  <th className="p-3 border border-gray-300">Patient ID</th>
                  <th className="p-3 border border-gray-300">Patient Name</th>
                  <th className="p-3 border border-gray-300">Patient Email</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment.paymentId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    {/* Serial Number */}
                    <td className="p-3 border border-gray-300 text-center">
                      {index + 1}
                    </td>

                    {/* Payment Info */}
                    <td className="p-3 border border-gray-300">
                      {payment.paymentType}
                    </td>
                    <td className="p-3 border border-gray-300">
                      ₹{payment.paymentAmount}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {payment.paymentStatus}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {payment.paymentDate || "N/A"}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {payment.paymentTime || "N/A"}
                    </td>

                    {/* ✅ Linked Patient Details */}
                    <td className="p-3 border border-gray-300">
                      {payment.patient ? payment.patient.patientId : "N/A"}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {payment.patient ? payment.patient.patientName : "N/A"}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {payment.patient ? payment.patient.patientEmail : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchAllPayments;
