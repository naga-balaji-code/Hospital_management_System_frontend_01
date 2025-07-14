import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background hospital video */}
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        src="https://cdn.pixabay.com/photo/2014/12/10/21/01/doctor-563429_1280.jpg" 
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-[url('https://media.istockphoto.com/id/2099357117/vector/heart-pulse-and-heartbeat-heartbeat-lone-cardiogram-beautiful-healthcare-medical-background.jpg?s=612x612&w=0&k=20&c=5agokqkO2Ls-JGCXC5eYl8mH_EO1ZnihZc-pEYtVBOI=')] bg-center bg-cover bg-opacity-60    text-white text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6  "
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Hospital Management System
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Seamlessly manage hospitals, staff, and patient records etc...
        </motion.p>

        <motion.button
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}

 onClick={handleNavigate}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default DashboardHome;