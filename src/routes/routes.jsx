import { createBrowserRouter } from "react-router-dom";
import Register from "../components/user/Register";
import Login from "../components/user/Login";
import Main from "../components/user/main/Main";
import Home from "../components/user/main/home/Home";
import About from "../components/user/main/about/About";
import Addbills from "../components/user/main/addbiil/Addbills";
import FilterBills from "../components/user/main/filterBills/FilterBills";

let routes=createBrowserRouter([
    {
        path:"/register",
        element:<Register></Register>

    },{
        path:"/",
        element:<Login></Login>
    },{
        path:"/home",
        element:<Main></Main>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },{
                path:"about",
                element:<About></About>
            },{
                path:"addBills",
                element:<Addbills></Addbills>
            },{
                path:"filter",
                element:<FilterBills></FilterBills>
            },
        ]
    }
])

export default routes