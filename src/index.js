import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import Products from "./components/Products.js"
import Register from "./components/Register.js"
import Login from "./components/Login.js"

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
   document.getElementById('root')
);
