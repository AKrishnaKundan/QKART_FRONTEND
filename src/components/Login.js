import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {

  const { enqueueSnackbar} = useSnackbar();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [apiCallDone,setApiCall] = useState(true);
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async () => {
    const data1 =  {username:username, password:password};
    if (!validateInput(data1)){
      return;
    }
    try{
    let url = config.endpoint + "/auth/login"; 
    setApiCall(false);
    const response = await axios.post(url, data1);
    setApiCall(true);
    let responseMessage = response;
    console.log(responseMessage);
    // if (responseMessage.data.success === true){ 
    enqueueSnackbar("Logged in successfully",{variant:"success"});
    let details = responseMessage.data;
    persistLogin(details.token, details.username, details.balance);
    history.push("/",{from:"/"});
    // }
    /*else if (responseMessage.data.success === false){
      console.log("false");
      enqueueSnackbar(responseMessage.message);
    }*/
  }
  catch(error){
      if (error.response.status === 400) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setApiCall(true);
        enqueueSnackbar(error.response.data.message,{variant:"error"});
      } else{
        setApiCall(true);
        enqueueSnackbar('Something went wrong',{variant:"error"});
      }
  }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */

  const validateInput = (data) => {

    if (data.username === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
    }  else if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
    }  else {
      return true;
    }
    return false;

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    
    localStorage.setItem('token',token);
    localStorage.setItem('username',username);
    localStorage.setItem('balance',balance);
  };

  const usernameCapture = (e)=>{
    setUsername(e.target.value);
  }
  const passwordCapture = (e)=>{
    setPassword(e.target.value);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      {/* <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        
        <Button
                className="explore-button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                onClick={()=>
                  {history.push("/",{from:"/"})}
                }
              >
                Back to explore
        </Button>
      </Box> */}

      <Header hasHiddenAuthButtons={true}/>

      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
    
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          title="Username"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={usernameCapture}
          fullWidth
        />

        <TextField
          required
          id="password"
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          placeholder="Enter a password with minimum 6 characters"
          value={password}
          onChange={passwordCapture}
          fullWidth
        />
         
        {apiCallDone && <Button className="button" variant="contained" onClick={login}>
          LOGIN TO QKART
          </Button>}
        {!apiCallDone && <div className="loader"> <CircularProgress /> </div>}
        
        <p className="secondary-action">
          Don’t have an account?
          <Link to="/register" className="link"> Register now </Link>
        </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
