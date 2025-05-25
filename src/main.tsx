// code provided by Tisha
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import { Provider } from "react-redux";
// import store from "./kambaz/store"; 
import "bootstrap/dist/css/bootstrap.min.css";
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);

/*

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";


createRoot(document.getElementById("root")!).render(
 <StrictMode>
   <App />
 </StrictMode>
);

*/

