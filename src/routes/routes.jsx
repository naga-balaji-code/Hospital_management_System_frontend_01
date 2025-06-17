import { createBrowserRouter } from "react-router-dom";
import Register from "../components/user/Register";

let routes=createBrowserRouter([
    {
        path:"/",
        element:<Register></Register>

    }
])

export default routes