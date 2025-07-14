import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const UpdateHospital = () => {
  const [hospitalId, setHospitalId] = useState('');
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalPhone: '',
    hospitalEmail: '',
    hospitalGst: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hospitalId ||
      !formData.hospitalName ||
      !formData.hospitalPhone ||
      !formData.hospitalEmail ||
      !formData.hospitalGst
    ) {
      toast.error('All fields including Hospital ID are required');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/updateHospitalById?oldHospitalId=${hospitalId}`,
        formData
      );
      if (response.status === 200) {
        toast.success('Hospital updated successfully!');
        setHospitalId('');
        setFormData({
          hospitalName: '',
          hospitalPhone: '',
          hospitalEmail: '',
          hospitalGst: '',
        });
      }
    } catch (error) {
      toast.error('Failed to update hospital');
    }
  };

  return (
    <div  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1170032577/photo/medical-sign-and-symbols-background.jpg?s=612x612&w=0&k=20&c=86QPDe0m7KchPNpxVTVsq5hWeLIb8CzFNh4pxi6Zx4Y=')",
          
      }}>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-sm:w-[90%] bg-white rounded-3xl shadow-2xl flex flex-col items-center gap-6 px-6 py-10"
      >
        <h2 className="text-3xl font-bold text-blue-800">Update Hospital</h2>

        <input
          type="number"
          name="hospitalId"
          placeholder="Enter Hospital ID"
          className="w-full border p-2 rounded-md outline-none"
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
        />

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          className="w-full border p-2 rounded-md outline-none"
          value={formData.hospitalName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="hospitalPhone"
          placeholder="Phone"
          className="w-full border p-2 rounded-md outline-none"
          value={formData.hospitalPhone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="hospitalEmail"
          placeholder="Email"
          className="w-full border p-2 rounded-md outline-none"
          value={formData.hospitalEmail}
          onChange={handleChange}
        />

        <input
          type="text"
          name="hospitalGst"
          placeholder="GST Number"
          className="w-full border p-2 rounded-md outline-none"
          value={formData.hospitalGst}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-bold py-2 rounded-md hover:bg-yellow-700 active:scale-95"
        >
          Update Hospital
        </button>
      </form>
    </div>
  );
};

export default UpdateHospital;