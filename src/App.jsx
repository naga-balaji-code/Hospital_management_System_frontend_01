// import { Route, Routes } from "react-router-dom";
import { Outlet, RouterProvider } from "react-router-dom";
import  "./App.css"
import routes from "./routes/Routes";
// import DashboardLayout from "./DashboardLayout.jsx";



const App = () => {
  return (
    
   <>
   <RouterProvider router={routes}></RouterProvider>
  
   </>
    
  );
};

export default App;