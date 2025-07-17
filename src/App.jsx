// import { Route, Routes } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";

// import DashboardLayout from "./DashboardLayout.jsx";



const App = () => {
  return (
    
   <>
   <RouterProvider router={routes}></RouterProvider>
  
   </>
    
  );
};

export default App;