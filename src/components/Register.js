import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RepeatOneSharp } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar} = useSnackbar();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  const [apiCallDone, setApiCall] = useState(true);
  const history = useHistory();

  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */


  const register = async (formData) => {
   
    const data2 = {username:username, password:password, password2 : password2};
    let userInputCheck = validateInput(data2);
    if (userInputCheck === false){
      return;
    }
    try{
    const data =  {username:username, password:password};
    let url = config.endpoint + "/auth/register"; 
    /*const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });*/
    
    const headers = {
      'Content-Type': 'application/json'
    }
    setApiCall(false);
    const response = await axios.post(url, JSON.stringify(data),{headers});
    setApiCall(true);
    let responseMessage = response;
    // console.log(responseMessage);
    if (responseMessage.data.success === true){ 
    enqueueSnackbar("Registered Successfully",{variant:"success"});
    history.push("/login",{from:"/"});
    
    }
    /*else if (responseMessage.data.success === false){
      console.log("false");
      enqueueSnackbar(responseMessage.message);
    }*/
  }
  catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setApiCall(true);
        enqueueSnackbar(error.response.data.message,{variant:"error"});
      } else{
        setApiCall(true);
        enqueueSnackbar('Something went wrong',{variant:"error"});
      }
  }

  //window.location.reload();
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
  
   if (username === ""){
    enqueueSnackbar("Username is a required field",{variant:"warning"});
    return false;
   }
   if (username.length < 6){
    enqueueSnackbar("Username must be at least 6 characters",{variant:"warning"});
    return false;
   }
   if (password === ""){
    enqueueSnackbar("Password is a required field",{variant:"warning"});
    return false;
   }
   if (password.length < 6){
    enqueueSnackbar("Password must be at least 6 characters",{variant:"warning"});
    return false;
   }

   if (password2 !== password){
    enqueueSnackbar("Passwords do not match",{variant:"warning"});
    return false;
   }
   return true;
  };

  const usernameCapture = (e)=>{
  setUsername(e.target.value);
  }

  const passwordCapture = (e)=>{
    setPassword(e.target.value);
  }
  
  const password2Capture = (e)=>{
    setPassword2(e.target.value);
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

      <Header hasHiddenAuthButtons />
     
    
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={usernameCapture}
            value={username}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={passwordCapture}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={password2}
            onChange={password2Capture}
            fullWidth
          />

           {apiCallDone && <Button className="button" variant="contained" onClick={register}>
            Register Now
           </Button>}
           {!apiCallDone && <CircularProgress />}

          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};
export default Register;
