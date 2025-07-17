
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../axiosInstance/Instance';

const SaveHospital = () => {
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
    const { hospitalName, hospitalPhone, hospitalEmail, hospitalGst } = formData;

    if (!hospitalName || !hospitalPhone || !hospitalEmail || !hospitalGst) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axiosInstance.post('/saveHospital', formData);
      if (response.status === 200) {
        toast.success('Hospital saved successfully!');
        setFormData({
          hospitalName: '',
          hospitalPhone: '',
          hospitalEmail: '',
          hospitalGst: '',
        });
      }
    } catch (error) {
      toast.error('Failed to save hospital');
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
        <h2 className="text-3xl font-bold text-blue-800">Save Hospital</h2>

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
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 active:scale-95"
        >
          Save Hospital
        </button>
      </form>
    </div>
  );
};

export default SaveHospital;