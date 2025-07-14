import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  MdAssignmentTurnedIn,
  MdDateRange,
  MdDescription,
  MdNumbers,
  MdOutlineDocumentScanner,
  MdTextSnippet,
} from "react-icons/md";

const UpdateReportById = () => {
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState({
    reportName: "",
    reportType: "",
    description: "",
    reportDate: "",
    reportStatus: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!report.reportName) err.reportName = "Report name is required";
    if (!report.reportType) err.reportType = "Report type is required";
    if (!report.description) err.description = "Description is required";
    if (!report.reportDate) err.reportDate = "Date is required";
    if (!report.reportStatus) err.reportStatus = "Status is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!reportId || isNaN(reportId)) {
      toast.error("Enter a valid Report ID");
      return;
    }
    if (!validate()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/updateReportById?oldReportId=${reportId}`,
        report
      );
      toast.success("Report updated successfully!");
      setReportId("");
      setReport({
        reportName: "",
        reportType: "",
        description: "",
        reportDate: "",
        reportStatus: "",
      });
    } catch (err) {
      toast.error("Failed to update report.");
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
          Update Report
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Report ID */}
          <div className="relative">
            <MdNumbers className="absolute top-3 left-3 text-gray-500" />
            <input
              type="number"
              placeholder="Report ID"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Report Name */}
          <div className="relative">
            <MdOutlineDocumentScanner className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="reportName"
              placeholder="Report Name"
              value={report.reportName}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.reportName && <p className="text-red-500 text-sm">{errors.reportName}</p>}
          </div>

          {/* Report Type */}
          <div className="relative">
            <MdTextSnippet className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="reportType"
              placeholder="Report Type"
              value={report.reportType}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.reportType && <p className="text-red-500 text-sm">{errors.reportType}</p>}
          </div>

          {/* Description */}
          <div className="relative">
            <MdDescription className="absolute top-3 left-3 text-gray-500" />
            <textarea
              name="description"
              placeholder="Description"
              value={report.description}
              onChange={handleChange}
              rows={3}
              className={`${inputStyle} resize-none`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Date */}
          <div className="relative">
            <MdDateRange className="absolute top-3 left-3 text-gray-500" />
            <input
              type="date"
              name="reportDate"
              value={report.reportDate}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.reportDate && <p className="text-red-500 text-sm">{errors.reportDate}</p>}
          </div>

          {/* Status */}
          <div className="relative">
            <MdAssignmentTurnedIn className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="reportStatus"
              placeholder="Report Status"
              value={report.reportStatus}
              onChange={handleChange}
              className={inputStyle}
            />
            {errors.reportStatus && <p className="text-red-500 text-sm">{errors.reportStatus}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReportById;
