import { createBrowserRouter } from "react-router-dom";
import Register from "../components/user/Register";
import Login from "../components/user/Login";
import Main from "../components/user/main/Main";

let routes=createBrowserRouter([
    {
        path:"/register",
        element:<Register></Register>

    },{
        path:"/",
        element:<Login></Login>
    },{
        path:"/home",
        element:<Main></Main>
    }
])

export default routes