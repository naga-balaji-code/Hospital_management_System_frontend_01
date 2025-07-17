import { createBrowserRouter } from "react-router-dom";
import DashboardHome from "../components/Dashbord/DashboardHome";
import DashboardLayout from "../components/Dashbord/DashboardLayout";
import DeleteAddress from "../components/address/DeleteAddress";
import FetchAddress from "../components/address/FetchAddress";
import FetchAllAddresses from "../components/address/FetchAllAddress";
import SaveAddress from "../components/address/SaveAddress";
import UpdateAddress from "../components/address/UpdateAddress";
import DeleteBranchById from "../components/branch/DeleteBranchById ";
import FetchAllBranch from "../components/branch/FetchAllBranch ";
import FetchBranchById from "../components/branch/FetchBranchById ";
import SaveBranch from "../components/branch/SaveBranch";
import UpdateBranchById from "../components/branch/UpdateBranchById ";
import DeleteBranchHeadById from "../components/branchHead/DeleteBranchHeadById";
import FetchAllBranchHead from "../components/branchHead/FetchAllBranchHead ";
import FetchBranchHeadById from "../components/branchHead/FetchBranchHeadById ";
import SaveBranchHead from "../components/branchHead/SaveBranchHead ";
import UpdateBranchHeadById from "../components/branchHead/UpdateBranchHeadById ";
import DeleteEmployeeById from "../components/employee/DeleteEmployeeById";
import FetchAllEmployee from "../components/employee/FetchAllEmployee";
import FetchEmployeeById from "../components/employee/FetchEmployeeById";
import SaveEmployee from "../components/employee/SaveEmployee";
import UpdateEmployeeById from "../components/employee/UpdateEmployeeById";
import DeleteEncounterById from "../components/encounter/DeleteEncounterById";
import FetchAllEncounter from "../components/encounter/FetchAllEncounter";
import FetchEncounterById from "../components/encounter/FetchEncounterById";
import SaveEncounter from "../components/encounter/SaveEncounter";
import UpdateEncounterById from "../components/encounter/UpdateEncounterById";
import DeleteHospital from "../components/hospital/DeleteHospital";
import FetchAllHospital from "../components/hospital/FetchAllHospital";
import FetchHospitalById from "../components/hospital/FetchHospitalById ";
import SaveHospital from "../components/hospital/SaveHospital";
import UpdateHospital from "../components/hospital/UpdateHospital";
import DeleteMedicineById from "../components/medicine/DeleteMedicineById";
import FetchAllMedicine from "../components/medicine/FetchAllMedicine";
import FetchMedicineById from "../components/medicine/FetchMedicineById";
import SaveMedicine from "../components/medicine/SaveMedicine";
import UpdateMedicineById from "../components/medicine/UpdateMedicineById";
import DeleteOwnerById from "../components/owner/DeleteOwnerById";
import FetchAllOwner from "../components/owner/FetchAllOwner";
import FetchOwnerById from "../components/owner/FetchOwnerById";
import SaveOwner from "../components/owner/SaveOwner";
import UpdateOwnerById from "../components/owner/UpdateOwnerById";
import DeletePatientById from "../components/patient/DeletePatientById";
import FetchAllPatient from "../components/patient/FetchAllPatient";
import FetchPatientById from "../components/patient/FetchPatientById";
import SavePatient from "../components/patient/SavePatient";
import UpdatePatientById from "../components/patient/UpdatePatientById";
import DeletePaymentById from "../components/payment/DeletePaymentById";
import FetchAllPayment from "../components/payment/FetchAllPayment";
import FetchPaymentById from "../components/payment/FetchPaymentById";
import SavePayment from "../components/payment/SavePayment";
import UpdatePaymentById from "../components/payment/UpdatePaymentById";
import DeleteReportById from "../components/report/DeleteReportById";
import FetchAllReport from "../components/report/FetchAllReport";
import FetchReportById from "../components/report/FetchReportById";
import SaveReport from "../components/report/SaveReport";
import UpdateReportById from "../components/report/UpdateReportById";
import DeleteRoomById from "../components/room/DeleteRoomById";
import FetchAllRoom from "../components/room/FetchAllRoom";
import FetchRoomById from "../components/room/FetchRoomById";
import SaveRoom from "../components/room/SaveRoom";
import UpdateRoomById from "../components/room/UpdateRoomById";
// import { Routes, Route, Navigate } from "react-router-dom";



const routes = createBrowserRouter([
  {
    path: "/home",
    element: <DashboardLayout/>,
  
  },{
path:"/",element:<DashboardHome></DashboardHome>
  },

      // Address
      { path: "address/save", element: <SaveAddress/> },
      { path: "address/fetch", element: <FetchAddress/> },
      { path: "address/update", element: <UpdateAddress/> },
      { path: "address/delete", element: <DeleteAddress/> },
      { path: "address/all", element: <FetchAllAddresses/> },

      // Branch
      { path: "branch/save", element: <SaveBranch/> },
      { path: "branch/fetch", element: <FetchBranchById/> },
      { path: "branch/update", element: <UpdateBranchById/> },
      { path: "branch/delete", element: <DeleteBranchById/> },
      { path: "branch/all", element: <FetchAllBranch/> },

      // BranchHead
      { path: "branchhead/save", element: <SaveBranchHead/> },
      { path: "branchhead/fetch", element: <FetchBranchHeadById/> },
      { path: "branchhead/update", element: <UpdateBranchHeadById /> },
      { path: "branchhead/delete", element: <DeleteBranchHeadById /> },
      { path: "branchhead/all", element: <FetchAllBranchHead /> },

      // Employee
      { path: "employee/save", element: <SaveEmployee/> },
      { path: "employee/fetch", element: <FetchEmployeeById/> },
      { path: "employee/update", element: <UpdateEmployeeById/> },
      { path: "employee/delete", element: <DeleteEmployeeById/> },
      { path: "employee/all", element: <FetchAllEmployee/> },

      // Encounter
      { path: "encounter/save", element: <SaveEncounter/> },
      { path: "encounter/fetch", element: <FetchEncounterById/> },
      { path: "encounter/update", element: <UpdateEncounterById/> },
      { path: "encounter/delete", element: <DeleteEncounterById/> },
      { path: "encounter/all", element: <FetchAllEncounter/> },

      // Hospital
      { path: "hospital/save", element: <SaveHospital/> },
      { path: "hospital/fetch", element: <FetchHospitalById/> },
      { path: "hospital/update", element: <UpdateHospital/> },
      { path: "hospital/delete", element: <DeleteHospital/> },
      { path: "hospital/all", element: <FetchAllHospital/> },

      // Medicine
      { path: "medicine/save", element: <SaveMedicine/> },
      { path: "medicine/fetch", element: <FetchMedicineById/> },
      { path: "medicine/update", element: <UpdateMedicineById/> },
      { path: "medicine/delete", element: <DeleteMedicineById/> },
      { path: "medicine/all", element: <FetchAllMedicine/> },

      // Owner
      { path: "owner/save", element: <SaveOwner/> },
      { path: "owner/fetch", element: <FetchOwnerById/> },
      { path: "owner/update", element: <UpdateOwnerById/> },
      { path: "owner/delete", element: <DeleteOwnerById></DeleteOwnerById> },
      { path: "owner/all", element: <FetchAllOwner/> },

      // Patient
      { path: "patient/save", element: <SavePatient/> },
      { path: "patient/fetch", element: <FetchPatientById/> },
      { path: "patient/update", element: <UpdatePatientById/> },
      { path: "patient/delete", element: <DeletePatientById/> },
      { path: "patient/all", element: <FetchAllPatient/> },

      // Payment
      { path: "payment/save", element: <SavePayment/> },
      { path: "payment/fetch", element: <FetchPaymentById/> },
      { path: "payment/update", element: <UpdatePaymentById/> },
      { path: "payment/delete", element: <DeletePaymentById/> },
      { path: "payment/all", element: <FetchAllPayment/> },

      // Report
      { path: "report/save", element: <SaveReport/> },
      { path: "report/fetch", element: <FetchReportById/> },
      { path: "report/update", element: <UpdateReportById/> },
      { path: "report/delete", element: <DeleteReportById/> },
      { path: "report/all", element: <FetchAllReport/> },

      // Room
      { path: "room/save", element: <SaveRoom/> },
      { path: "room/fetch", element: <FetchRoomById/> },
      { path: "room/update", element: <UpdateRoomById/> },
      { path: "room/delete", element: <DeleteRoomById/> },
      { path: "room/all", element: <FetchAllRoom/> },
    
  
]);

export default routes;