import React,{useState, useEffect} from 'react';
import axios from "axios";
import "./Register.css";
import InputComp from '../../Components/InputComp/InputComp';
import { Box,Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, Img } from '@chakra-ui/react';
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import AuthButton from '../../Components/ButtonComp/AuthButton';
import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/lgn_logo.png"


const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setdisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!name.trim() || !email.trim() || !password.trim()) {
            setdisable(true);
        } else {
            setdisable(false)
        }
    }, [name, email, password]);

    /* Handle register new user */
    const handleRegister = () => {
      setLoading(true)
      setdisable(true)
        let data = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}api/v1/admins/register`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if(response.data.status === 201) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.admin));
                setName("")
                setEmail("");
                setPassword("");
                setLoading(false);
                navigate("/")
              }
          })
          .catch((error) => {
            setLoading(false)
            setError(error.response.data.error.message.message);
            setName("");
            setEmail("");
            setPassword("");
          });
    }

  return (
    <Box className='auth_page_container'>
        <Box>
      <Box className="image_container">
        <Img src={Logo} className="logo_auth" />
      </Box>

     {/* Form section */}
<Box className='auth_form_section'>
{/* Name inputs */}
<Box className='input_section'>
    <Box className='input_icons'><FaUser /></Box>
    <InputComp 
        type="text" 
        className={"auth_input"}
        placeholder={"Name"} 
        value={name} 
        handleChange={e => setName(e.target.value)}
    />
</Box>

{/* Email inputs */}
<Box className='input_section'>
    <Box className='input_icons'><MdOutlineEmail /></Box>
    <InputComp 
        type="email" 
        className={"auth_input"}
        placeholder={"Email"} 
        value={email} 
        handleChange={e => setEmail(e.target.value)}
    />
</Box>

{/* Email inputs */}
<Box className='input_section'>
    <Box className='input_icons'><IoMdLock /></Box>
    <InputComp 
        type="password" 
        className={"auth_input"}
        placeholder={"Password"} 
        value={password} 
        handleChange={e => setPassword(e.target.value)}
    />
</Box>

<Box className='redirection_link' onClick={() => navigate("/login")}>
    Already have an account?
</Box>

<AuthButton 
    disable={disable} 
    loading={loading} 
    className={'auth_button'} 
    disableClassName={'disable_auth_button'} 
    text="Register" 
    handleClick={handleRegister}
/>
{
  error && 
  <Alert status='error'>
    <AlertIcon />
    <AlertTitle>Error!</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
}
</Box>
      </Box>
    </Box>
  )
}

export default Register;