import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdEmail, MdNumbers, MdPerson, MdPhone, MdTransgender } from "react-icons/md";

const SavePatient = () => {
  const [patient, setPatient] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientEmail: "",
    patientPhone: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!patient.patientName) err.patientName = "Name is required";
    if (!patient.patientAge || isNaN(patient.patientAge))
      err.patientAge = "Valid age required";
    if (!patient.patientGender) err.patientGender = "Gender is required";
    if (
      !patient.patientEmail ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(patient.patientEmail)
    )
      err.patientEmail = "Valid email required";
    if (
      !patient.patientPhone ||
      isNaN(patient.patientPhone) ||
      patient.patientPhone.length < 10
    )
      err.patientPhone = "Valid phone number required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/savePatient", patient);
      toast.success("Patient saved successfully!");
      setPatient({
        patientName: "",
        patientAge: "",
        patientGender: "",
        patientEmail: "",
        patientPhone: "",
      });
    } catch (err) {
      toast.error("Failed to save patient.");
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
          Save Patient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={patient.patientName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm">{errors.patientName}</p>
            )}
          </div>

          {/* Age */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="patientAge"
              placeholder="Patient Age"
              value={patient.patientAge}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.patientAge && (
              <p className="text-red-500 text-sm">{errors.patientAge}</p>
            )}
          </div>

          {/* Gender */}
          <div className="relative">
            <MdTransgender className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="patientGender"
              placeholder="Gender (e.g. Male/Female)"
              value={patient.patientGender}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.patientGender && (
              <p className="text-red-500 text-sm">{errors.patientGender}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-gray-500" />
            <input
              type="email"
              name="patientEmail"
              placeholder="Patient Email"
              value={patient.patientEmail}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.patientEmail && (
              <p className="text-red-500 text-sm">{errors.patientEmail}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-gray-500" />
            <input
              type="tel"
              name="patientPhone"
              placeholder="Patient Phone"
              value={patient.patientPhone}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.patientPhone && (
              <p className="text-red-500 text-sm">{errors.patientPhone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Save Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavePatient;
