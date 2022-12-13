import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, TextField,InputAdornment} from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import { config } from "../App";
import SearchIcon from '@mui/icons-material/Search';
import {useLocation,useHistory} from "react-router-dom";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import "./Header.css";

const Header = ({children, hasHiddenAuthButtons}) => {
  const history = useHistory();
  const location = useLocation();
  let timerId = setTimeout(()=>{},500);
    return (
      <Box className="header" name="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>

        {children}

        <Stack direction="row" spacing={2}>
          {
            (hasHiddenAuthButtons) 
              ?<Button
                className="explore-button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                onClick={()=>
                  {history.push("/",{from:"/"})}
                }
              >
                Back to explore
              </Button>
              :
((localStorage.getItem("username")) ?
              <>
              <img src="avatar.png" name="avatar" alt={localStorage.getItem("username")}/>
              {localStorage.getItem('username')}
              <Button
                className=""
                variant="text"
                name="logout"
                onClick={()=>{
                  localStorage.clear();
                  window.location.reload(true);
                }}
                >
                  Logout
              </Button>
              </>
              : 
                <>
                  <Button
                    className=""
                    variant="text"
                    name="login"
                    onClick={()=>{
                      history.push("/login",{from:"/"})
                    }}
                  >
                  Login
                  </Button>
                    
                  <Button
                    className=""
                    variant="text"
                    name="register"
                    onClick={()=>{
                      history.push("/register",{from:"/"})
                    }}
                  >
                  Register
                  </Button>
                </>
              )
          }  
            
        </Stack>
      </Box>
    );
};

export default Header;
