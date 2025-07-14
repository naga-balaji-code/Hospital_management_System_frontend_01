import {createRoot} from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
// import { Toaster } from "react-hot-toast"
// import Context from "./components/context/Context"


createRoot(document.getElementById("root")).render(<>
{/* <Context><App></App></Context> */}
{/* <Toaster></Toaster> */}


      <App/>
    

</>)