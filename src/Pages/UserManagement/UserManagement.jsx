/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Td,
} from "@chakra-ui/react";
import "./UserManagement.css";
import InputComp from "../../Components/InputComp/InputComp";
import axios from "axios";
import UserListSection from "./UserListSection";
import SearchUserList from "./SearchUserList";

const UserManagement = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(3);
  const [loadPageBtn, setLoadPageBtn] = useState(false);

  useEffect(() => {
    if (name.trim() !== "" || email.trim() !== "" || mobile.trim() !== "") {
      if (page === 1) {
        setLoading(true);
      }
      let data = JSON.stringify({
        name: name,
        email: email,
        mobile: mobile,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}api/profile/search-user?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setCount(response.data.users.length);
          if (page === 1) {
            setUsers(response.data.users);
          } else {
            setUsers((prev) => [...prev, ...response.data.users]);
          }
          setLoading(false);
          setLoadPageBtn(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Get users API call
      if (page === 1) {
        setLoading(true);
      }
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}api/profile/?page=${page}&limit=${limit}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setCount(response.data.users.length);
          if (page === 1) {
            setUsers(response.data.users);
          } else {
            setUsers((prev) => [...prev, ...response.data.users]);
          }
          setLoading(false);
          setLoadPageBtn(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [name, email, mobile, page]);

  const handleIncrementPage = () => {
    setLoadPageBtn(true);
    setPage((prev) => prev + 1);
  };

  /* Handle change name */
  const handleChangeName = (e) => {
    setPage(1);
    setLimit(3);
    setUsers([]);
    setMobile("");
    setEmail("");
    setName(e.target.value);
  };
  /* Handle change email */
  const handleChangeEmail = (e) => {
    setPage(1);
    setLimit(3);
    setUsers([]);
    setEmail(e.target.value);
    setMobile("");
    setName("");
  };
  /* Handle change mobile */
  const handleChangeMobile = (e) => {
    setPage(1);
    setLimit(3);
    setUsers([]);
    setMobile(e.target.value);
    setEmail("");
    setName("");
  };

  return (
    <Layout>
      <Box className='user_magement_page'>
        {/* Header Section */}
        <Box className='header_section'>
          <Box className='header_back_section'>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>User list</span>
          </Box>
        </Box>

        {/* Search Input section */}
        <Box className='search_input_section'>
          {/* Name */}
          <InputComp
            type='name'
            placeholder={"Search user by name"}
            className={"search_input"}
            value={name}
            handleChange={(e) => handleChangeName(e)}
          />
          {/* Email */}
          <InputComp
            type='email'
            placeholder={"Search user by email"}
            className={"search_input"}
            value={email}
            handleChange={(e) => handleChangeEmail(e)}
          />
          {/* Phone */}
          <InputComp
            type='name'
            placeholder={"Search user by phone"}
            className={"search_input"}
            value={mobile}
            handleChange={(e) => handleChangeMobile(e)}
          />
        </Box>
        <Box className='user_table_section'>
          {!name.trim() && !mobile.trim() && !email.trim() ? (
            <UserListSection
              users={users}
              count={count}
              limit={limit}
              loading={loading}
              handleIncrementPage={handleIncrementPage}
              loadPageBtn={loadPageBtn}
            />
          ) : (
            <SearchUserList
              users={users}
              count={count}
              limit={limit}
              loading={loading}
              handleIncrementPage={handleIncrementPage}
              loadPageBtn={loadPageBtn}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default UserManagement;
