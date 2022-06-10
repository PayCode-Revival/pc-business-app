import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AllRoutes } from "./components/AllRoutes/AllRoutes"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
