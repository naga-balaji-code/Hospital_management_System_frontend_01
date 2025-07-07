import {createRoot} from "react-dom/client"
import App from "./App"
import { Toaster } from "react-hot-toast"
import Context from "./components/context/Context"


createRoot(document.getElementById("root")).render(<>
<Context><App></App></Context>
<Toaster></Toaster>
</>)