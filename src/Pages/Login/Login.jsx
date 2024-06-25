/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import InputComp from "../../Components/InputComp/InputComp";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,Img
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import AuthButton from "../../Components/ButtonComp/AuthButton";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/lgn_logo.png"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setdisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email.trim() || !password.trim()) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  }, [email, password]);

  /* handle login click */
  const loginAdmin = () => {
    setdisable(true);
    setLoading(true);
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/admins/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.admin));
          setEmail("");
          setPassword("");
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        setEmail("");
        setPassword("");
        setLoading(false);
      });
  };

  return (
    <Box className='auth_page_container'>
      <Box>
      <Box className="image_container">
        <Img src={Logo} className="logo_auth" />
      </Box>

      {/* Form section */}
      <Box className='auth_form_section'>
        {/* Email inputs */}
        <Box className='input_section'>
          <Box className='input_icons'>
            <MdOutlineEmail />
          </Box>
          <InputComp
            type='email'
            className={"auth_input"}
            placeholder={"Email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Password inputs */}
        <Box className='input_section'>
          <Box className='input_icons'>
            <IoMdLock />
          </Box>
          <InputComp
            type='password'
            className={"auth_input"}
            placeholder={"Password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box className='redirection_link' onClick={() => navigate("/register")}>
          Don't have an account?
        </Box>

        <AuthButton
          disable={disable}
          loading={loading}
          className={"auth_button"}
          disableClassName={"disable_auth_button"}
          text='Login'
          handleClick={loginAdmin}
        />

        {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Box>
      </Box>
    </Box>
  );
};

export default Login;
