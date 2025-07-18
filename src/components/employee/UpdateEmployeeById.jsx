
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAttachMoney,
  MdEmail,
  MdNumbers,
  MdPerson,
  MdPhone,
  MdWork,
} from "react-icons/md";
import axiosInstance from "../axiosInstance/Instance";

const UpdateEmployeeById = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePhone: "",
    employeeSalary: "",
    employeeRole: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!employee.employeeName) newErrors.employeeName = "Name is required";
    if (!employee.employeeEmail || !employee.employeeEmail.includes("@"))
      newErrors.employeeEmail = "Valid email is required";
    if (!employee.employeePhone || employee.employeePhone.length < 10)
      newErrors.employeePhone = "Phone must be 10 digits";
    if (!employee.employeeSalary || employee.employeeSalary <= 0)
      newErrors.employeeSalary = "Salary must be greater than 0";
    if (!employee.employeeRole) newErrors.employeeRole = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!employeeId || isNaN(employeeId)) {
      toast.error("Enter a valid Employee ID");
      return;
    }

    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      await axiosInstance.put(
        `/updateEmployeeById?oldEmployeeId=${employeeId}`,
        employee
      );
      toast.success("Employee updated successfully!");
      setEmployee({
        employeeName: "",
        employeeEmail: "",
        employeePhone: "",
        employeeSalary: "",
        employeeRole: "",
      });
      setEmployeeId("");
    } catch (err) {
      toast.error("Failed to update employee.");
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
          Update Employee
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* ID */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              name="employeeId"
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Name */}
          <div className="relative">
            <MdPerson className="absolute top-3 left-3 text-gray-500" />
            <input
              name="employeeName"
              placeholder="Name"
              value={employee.employeeName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.employeeName && (
              <p className="text-red-500 text-sm">{errors.employeeName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-3 left-3 text-gray-500" />
            <input
              name="employeeEmail"
              placeholder="Email"
              value={employee.employeeEmail}
              onChange={handleChange}
              type="email"
              className={inputStyle}
            />
            {errors.employeeEmail && (
              <p className="text-red-500 text-sm">{errors.employeeEmail}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <MdPhone className="absolute top-3 left-3 text-gray-500" />
            <input
              name="employeePhone"
              placeholder="Phone"
              value={employee.employeePhone}
              onChange={handleChange}
              type="number"
              className={inputStyle}
            />
            {errors.employeePhone && (
              <p className="text-red-500 text-sm">{errors.employeePhone}</p>
            )}
          </div>

          {/* Salary */}
          <div className="relative">
            <MdAttachMoney className="absolute top-3 left-3 text-gray-500" />
            <input
              name="employeeSalary"
              placeholder="Salary"
              value={employee.employeeSalary}
              onChange={handleChange}
              type="number"
              className={inputStyle}
            />
            {errors.employeeSalary && (
              <p className="text-red-500 text-sm">{errors.employeeSalary}</p>
            )}
          </div>

          {/* Role */}
          <div className="relative">
            <MdWork className="absolute top-3 left-3 text-gray-500" />
            <input
              name="employeeRole"
              placeholder="Role"
              value={employee.employeeRole}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.employeeRole && (
              <p className="text-red-500 text-sm">{errors.employeeRole}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeById;