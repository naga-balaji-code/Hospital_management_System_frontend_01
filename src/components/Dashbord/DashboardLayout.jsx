import { useEffect, useRef, useState } from "react";
import { FaHospitalAlt } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { HashLink } from "react-router-hash-link";

const DashboardLayout = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const menuItem = (label, icon, basePath, routes) => (
    <div>
      <button
        onClick={() => toggleMenu(basePath)}
        className="text-left w-full text-white hover:text-blue-200 font-semibold transition-all duration-300 pl-3 mb-1"
      >
        {icon} {label}
      </button>
      {openMenu === basePath && (
        <div className="ml-6 flex flex-col gap-2 text-sm text-blue-100">
          {routes.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-200 border-l-4 border-blue-200 pl-2"
                  : "hover:text-blue-200 transition-all pl-2"
              }
            >
              • {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
  const services = [
  { name: "Save Address", path: "/address/save" },
  { name: "Fetch Address", path: "/address/fetch" },
  { name: "Fetch All Address", path: "/address/all" },
  { name: "Update Address", path: "/address/update" },
  { name: "Delete Address", path: "/address/delete" },

  { name: "Save Branch", path: "/branch/save" },
  { name: "Fetch Branch", path: "/branch/fetch" },
  { name: "Fetch All Branch", path: "/branch/all" },
  { name: "Update Branch", path: "/branch/update" },
  { name: "Delete Branch", path: "/branch/delete" },

  { name: "Save Employee", path: "/employee/save" },
  { name: "Fetch Employee", path: "/employee/fetch" },
  { name: "Fetch All Employee", path: "/employee/all" },
  { name: "Update Employee", path: "/employee/update" },
  { name: "Delete Employee", path: "/employee/delete" },
];
 const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    const scroll = () => {
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    let isHovered = false;
    const startScroll = () => {
      if (!isHovered) scroll();
    };
    const stopScroll = () => {
      cancelAnimationFrame(animationFrameId);
    };

    container.addEventListener("mouseenter", () => {
      isHovered = true;
      stopScroll();
    });
    container.addEventListener("mouseleave", () => {
      isHovered = false;
      startScroll();
    });

    startScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleNavigate = (path, e) => {
    e.stopPropagation();
    navigate(path);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f7fa] via-[#f3f4f6] to-[#e0f2f1]" id="home">
      <div className="flex flex-1 border-b-8 border-white rounded-2xl">
        {/* Sidebar */}
        <aside className="w-72 bg-[url('https://cdn.pixabay.com/photo/2024/02/13/17/30/dna-8571480_1280.jpg')] bg-cover bg-center border-r border-blue-100 shadow-xl flex flex-col px-6 py-8 overflow-y-auto text-white h-screen sticky top-0">
          <div className="flex items-center gap-3 mb-10">
            <FaHospitalAlt className="text-white text-4xl animate-pulse" />
            <h1 className="text-3xl font-extrabold">HMS</h1>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-l-4 border-blue-200 pl-3"
                  : "text-white hover:text-blue-100 transition-all pl-3"
              }
            >
              🏠 Dashboard Home
            </NavLink>

            {menuItem("Hospitals", "🏥", "hospital", [
              { path: "/hospital/save", label: "Save Hospital" },
              { path: "/hospital/all", label: "Fetch All Hospitals" },
              { path: "/hospital/delete", label: "Delete Hospital" },
              { path: "/hospital/fetch", label: "Fetch Hospital By ID" },
              { path: "/hospital/update", label: "Update Hospital" },
            ])}

            {menuItem("Branches", "🏢", "branch", [
              { path: "/branch/save", label: "Save Branch" },
              { path: "/branch/all", label: "Fetch All Branches" },
              { path: "/branch/delete", label: "Delete Branch" },
              { path: "/branch/fetch", label: "Fetch Branch By ID" },
              { path: "/branch/update", label: "Update Branch" },
            ])}

            {menuItem("Branch Heads", "👨‍💼", "branchhead", [
              { path: "/branchhead/save", label: "Save Branch Head" },
              { path: "/branchhead/all", label: "Fetch All Branch Heads" },
              { path: "/branchhead/delete", label: "Delete Branch Head" },
              { path: "/branchhead/fetch", label: "Fetch Branch Head By ID" },
              { path: "/branchhead/update", label: "Update Branch Head" },
            ])}

            {menuItem("Addresses", "📍", "address", [
              { path: "/address/save", label: "Save Address" },
              { path: "/address/all", label: "Fetch All Addresses" },
              { path: "/address/delete", label: "Delete Address" },
              { path: "/address/fetch", label: "Fetch Address By ID" },
              { path: "/address/update", label: "Update Address" },
            ])}

            {menuItem("Employees", "🧑‍⚕️", "employee", [
              { path: "/employee/save", label: "Save Employee" },
              { path: "/employee/all", label: "Fetch All Employees" },
              { path: "/employee/delete", label: "Delete Employee" },
              { path: "/employee/fetch", label: "Fetch Employee By ID" },
              { path: "/employee/update", label: "Update Employee" },
            ])}

            {menuItem("Patients", "🧑‍🦽", "patient", [
              { path: "/patient/save", label: "Save Patient" },
              { path: "/patient/all", label: "Fetch All Patients" },
              { path: "/patient/delete", label: "Delete Patient" },
              { path: "/patient/fetch", label: "Fetch Patient By ID" },
              { path: "/patient/update", label: "Update Patient" },
            ])}

            {menuItem("Medicines", "💊", "medicine", [
              { path: "/medicine/save", label: "Save Medicine" },
              { path: "/medicine/all", label: "Fetch All Medicines" },
              { path: "/medicine/delete", label: "Delete Medicine" },
              { path: "/medicine/fetch", label: "Fetch Medicine By ID" },
              { path: "/medicine/update", label: "Update Medicine" },
            ])}

            {menuItem("Encounters", "🗕️", "encounter", [
              { path: "/encounter/save", label: "Save Encounter" },
              { path: "/encounter/all", label: "Fetch All Encounters" },
              { path: "/encounter/delete", label: "Delete Encounter" },
              { path: "/encounter/fetch", label: "Fetch Encounter By ID" },
              { path: "/encounter/update", label: "Update Encounter" },
            ])}

            {menuItem("Payments", "💳", "payment", [
              { path: "/payment/save", label: "Save Payment" },
              { path: "/payment/all", label: "Fetch All Payments" },
              { path: "/payment/delete", label: "Delete Payment" },
              { path: "/payment/fetch", label: "Fetch Payment By ID" },
              { path: "/payment/update", label: "Update Payment" },
            ])}

            {menuItem("Reports", "📄", "report", [
              { path: "/report/save", label: "Save Report" },
              { path: "/report/all", label: "Fetch All Reports" },
              { path: "/report/delete", label: "Delete Report" },
              { path: "/report/fetch", label: "Fetch Report By ID" },
              { path: "/report/update", label: "Update Report" },
            ])}

            {menuItem("Rooms", "🛎️", "room", [
              { path: "/room/save", label: "Save Room" },
              { path: "/room/all", label: "Fetch All Rooms" },
              { path: "/room/delete", label: "Delete Room" },
              { path: "/room/fetch", label: "Fetch Room By ID" },
              { path: "/room/update", label: "Update Room" },
            ])}

            {menuItem("Owners", "👤", "owner", [
              { path: "/owner/save", label: "Save Owner" },
              { path: "/owner/all", label: "Fetch All Owners" },
              { path: "/owner/delete", label: "Delete Owner" },
              { path: "/owner/fetch", label: "Fetch Owner By ID" },
              { path: "/owner/update", label: "Update Owner" },
            ])}
          </nav>
        </aside>

        {/* Main Content with background video */}
        <main className="relative flex-1">
          <div className="absolute inset-0 ">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://cdn.pixabay.com/video/2019/03/20/22139-325698660_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0  bg-opacity-50"></div>
          </div>

          {/* Top NavBar */}
          <header className="sticky top-0 z-10 backdrop-blur-md bg-black/40 text-white px-6 py-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaHospitalAlt className="text-blue-500 text-2xl" />
              <h2 className="text-xl font-bold">Hospital Management System</h2>
            </div>
            <nav className="hidden md:flex gap-6 text-lg">
              <HashLink to="#home" className= "text-blue-200  hover:text to-blue-400 transition-all duration-300 hover:text-xl">Home</HashLink>
              <HashLink to="#about" className= "text-blue-200 hover:text to-blue-400 transition-all duration-300 hover:text-xl">About</HashLink>
              <HashLink to="#service" className="text-blue-200  hover:text to-blue-400 transition-all duration-300 hover:text-xl">Services</HashLink>
              <HashLink to="#contact" className="text-blue-200  hover:text to-blue-400 transition-all duration-300 hover:text-xl">Contact</HashLink>
            </nav>
          </header>

          {/* Main outlet content */}
          <section className="p-6">
            <Outlet />
          </section>
        </main>
      </div>

      {/* Extended scrollable section */}
     <section id="about" className="bg-cyan-950 text-white py-20 px-4 sm:px-6 lg:px-12 space-y-16 border-2 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-950">
  {/* Header */}
  <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
    <h2 className="text-4xl font-bold mb-4">ABOUT</h2>
    <p className="text-lg text-gray-300 max-w-2xl">
      Scroll below to see more hospital management features...
    </p>
  </div>

  {/* Cards Grid */}
  <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-center items-stretch gap-8 max-w-6xl mx-auto">
    <div className="flex-1 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md transition hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-3">🔷 Project Goal
</h3>
      <p>This Hospital Management System is designed to digitally manage all operations in a hospital environment — from storing hospital and branch details to managing staff, patients, payments, reports, and much more. The system is built using a React + Tailwind CSS frontend and a Spring Boot backend with a MySQL database</p>
    </div>
    <div className="flex-1 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md transition hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-3">
🧱 Architecture Overview
</h3>
      <p><li >Frontend:</li>React.js (function-based components), Tailwind CSS for styling, Axios for API requests, and React Router for routing.</p>
      <p><li>Backend:</li>Spring Boot (REST APIs), Spring Data JPA for ORM, Lombok for boilerplate code.</p>
      <p><li>Database:</li>MySQL (relational database with proper relationships between entities).</p>
      <p><li>UI Enhancements:</li>react-hot-toast for notifications, react-icons for better UI/UX, Framer Motion and background video for better design.</p>
    </div>
    <div className="flex-1 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md transition hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-3">📁 Modules Included</h3>
      <li>
 🏨 Hospital: Name, Phone, Email, GST, Branches
🏢 Branch	: Address, Employees, Patients
👤 Employee	Address
👩‍⚕️ Patient	Medical info, Medicines, Reports,Encounters
🏠 Address	Full address with city, state, etc.
💊 Medicine	Name, Type, Dose, Price
📄 Report	Type, Status, Description
💳 Payment	Amount, Mode, Date, Status
📅 Encounter	Type, Time, Status
💼 Owner	Net worth, One-to-One with Hospital
👔 Branch Head	One-to-One with Branch
🛏️ Room	Room type

      </li>
    </div>

     <div className="flex-1 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md transition hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-3">💡 Key Features</h3>
      <ol>
        <li>🧑‍⚕️ Add, update, delete, and fetch all major hospital entities</li>
          <li>🔐 RESTful API integration with Spring Boot</li>
          <li>🌐 Fully responsive design (mobile, tablet, desktop)</li>
        <li>✅ Form validation and success/error toasts</li>
        <li>⚡ Fast and smooth UX using Vite + Tailwind</li>
        <li>📥 Clean code structure with reusable components</li>
      </ol>
    </div>

  </div>
</section >
<section id="page-3">
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-6 py-12"
      style={{ backgroundImage: `url(https://media.istockphoto.com/id/1214977678/photo/hand-in-medical-gloves.jpg?s=612x612&w=0&k=20&c=z4aSEP5ZaiFswSXORaImUO49Qkuzk8iezwB1wm4DPf4=)` }}
    >
      {/* Service */}
      <div className="text-blue-500 text-center mb-10" id="service">
        <h1 className="text-4xl font-bold mb-4 ">Services</h1>
        <p className="text-lg max-w-3xl mx-auto">
          We can perform operations like Save, Fetch, Fetch All, Delete, and Update.
        </p>
      </div>

      <div className="overflow-x-auto whitespace-nowrap" ref={containerRef}>
        <div className="flex gap-6">
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.path)}
              className="inline-block min-w-[280px] max-w-xs h-[300px] bg-white/90 text-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-cyan-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-cyan-50"
            >
              <h2 className="text-xl font-bold mb-4 text-center text-cyan-800">{service.name}</h2>
              <p className="text-sm mb-4 text-gray-600 text-center">
                Perform {service.name.toLowerCase()} functionality.
              </p>
              <button
                onClick={(e) => handleNavigate(service.path, e)}
                className="mx-auto px-5 py-2 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-800 active:scale-95 transition"
              >
                Click
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
</section>
{/* page 4 */}
<section className="bg-gradient-to-br from-cyan-950 to-slate-900 text-white py-12 px-6 md:px-16" id="contact">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* CONTACT US */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-300 dancing-font">CONTACT US</h2>
          <p className="flex items-center gap-2"><MdLocationOn className="text-cyan-400" /> Shamshabad, Hyderabad</p>
          <p className="flex items-center gap-2"><MdPhone className="text-cyan-400" /> +91 63057 29443</p>
          <p className="flex items-center gap-2"><MdEmail className="text-cyan-400" /> nagabalaji1111@gmail.com</p>
          <div className="flex gap-4 text-2xl mt-4">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-400 transition" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="hover:text-blue-400 transition" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-blue-500 transition" />
            </a>
          </div>
        </div>

        {/* ABOUT HMS */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-cyan-300 dancing-font ">HOSPITAL MANAGEMENT SYSTEM</h2>
          <p className=" dancing-font text-sm leading-relaxed text-justify text-gray-300">
            Our Hospital Management System is a comprehensive web application designed to streamline operations across hospitals. It handles patient registrations, employee records, appointments, medicine tracking, payments, and report generation. With a responsive dashboard and smart integration, the HMS ensures efficient management, better patient care, and smooth coordination across departments—empowering healthcare providers with digital efficiency.
          </p>
        </div>

        {/* WORKING HOURS */}
        <div className="flex-1 space-y-4">
          <h2 className="dancing-font text-2xl font-bold text-cyan-300 ">Working Hours</h2>
          <p className="text-lg font-semibold">Open All Days</p>
          <p className="text-lg font-semibold">Emergency number-<h2 className="text-red-600">040-6810-6587</h2></p>
          <p className="text-base">24x7 Emergency Services</p>
          <p className="text-base">OPD Timings: 10:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-12 pt-4 text-center text-sm text-gray-400">
        &copy;2025 ALL RIGHTS RESERVED BY HOSPITAL MANAGEMENT SYSTEM.
      </div>
    </section>
    </div>
  );
};

export default DashboardLayout;
