
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdAccessTime, MdAssignmentTurnedIn, MdAttachMoney, MdCreditCard, MdDateRange } from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const SavePayment = () => {
  const [payment, setPayment] = useState({
    paymentType: "",
    paymentAmount: "",
    paymentStatus: "",
    paymentDate: "",
    paymentTime: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!payment.paymentType) err.paymentType = "Payment type is required";
    if (!payment.paymentAmount || isNaN(payment.paymentAmount)) err.paymentAmount = "Valid amount required";
    if (!payment.paymentStatus) err.paymentStatus = "Payment status is required";
    if (!payment.paymentDate) err.paymentDate = "Date is required";
    if (!payment.paymentTime) err.paymentTime = "Time is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix validation errors.");
      return;
    }

    try {
      await axiosInstance.post("/savePayment", payment);
      toast.success("Payment saved successfully!");
      setPayment({
        paymentType: "",
        paymentAmount: "",
        paymentStatus: "",
        paymentDate: "",
        paymentTime: "",
      });
    } catch (err) {
      toast.error("Error saving payment.");
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
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Save Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Type */}
          <div className="relative">
            <MdCreditCard className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="paymentType"
              placeholder="Payment Type (e.g. Cash, Card)"
              value={payment.paymentType}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.paymentType && <p className="text-red-500 text-sm">{errors.paymentType}</p>}
          </div>

          {/* Payment Amount */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="paymentAmount"
              placeholder="Payment Amount"
              value={payment.paymentAmount}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.paymentAmount && <p className="text-red-500 text-sm">{errors.paymentAmount}</p>}
          </div>

          {/* Payment Status */}
          <div className="relative">
            <MdAssignmentTurnedIn className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="paymentStatus"
              placeholder="Payment Status (e.g. Paid, Pending)"
              value={payment.paymentStatus}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus}</p>}
          </div>

          {/* Payment Date */}
          <div className="relative">
            <MdDateRange className="absolute top-3 left-3 text-gray-500" />
            <input
              type="date"
              name="paymentDate"
              value={payment.paymentDate}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.paymentDate && <p className="text-red-500 text-sm">{errors.paymentDate}</p>}
          </div>

          {/* Payment Time */}
          <div className="relative">
            <MdAccessTime className="absolute top-3 left-3 text-gray-500" />
            <input
              type="time"
              name="paymentTime"
              value={payment.paymentTime}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.paymentTime && <p className="text-red-500 text-sm">{errors.paymentTime}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavePayment;
