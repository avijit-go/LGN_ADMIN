import React from 'react'
import "./MainHeader.css"
import { Box, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button, Img
} from '@chakra-ui/react';
import Logo from "../../Assets/lgn_logo.png";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }
  return (
    <Box className='main_header'>
      {/* Title */}
      <Box className='app_details_info'>
        <Img src={Logo} className='header_logo' />
        <Box className="app_title">LGN Dashboard</Box>
      </Box>

      <Button className='header_logout_btn' onClick={handleLogout}>
        <MdLogout />
      </Button>
    </Box>
  )
}

export default MainHeader;