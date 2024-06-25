/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  Input,
  Image,
  Img,
  Td,
  Spinner,
} from "@chakra-ui/react";
import "./TournamentPage.css";
import FullModal from "../../Components/modalComp/FullModal";
import Inputcomp from "../../Components/InputComp/InputComp";
import ButtonComp from "../../Components/ButtonComp/AuthButton";
import { FiUpload } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Avatar from "../../Assets/download.jpeg";
import { IoMdClose } from "react-icons/io";
import Loader from "../../Components/Loader/Loader";
import TournamentsComp from "../../Components/TournamentsComp/TournamentsComp";
import InputComp from "../../Components/InputComp/InputComp";

const TournamentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setuserId] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [tournament_by, settournament_by] = useState("");
  const [mainLoader, setMainLoader] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(10);
  const [loadPageBtn, setLoadPageBtn] = useState(false);
  const [searchTitle, setSearchTitle] = useState("")

  const handleIncrementPage = () => {
    setLoadPageBtn(true);
    setPage((prev) => prev + 1);
  };

  const handleCloseCreateBannerModal = () => {
    setOpenCreateModal(false);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleCloseImage = () => {
    setImage("");
    setPrevImage("");
  };

  useEffect(() => {
    let data = JSON.stringify({
      name: name,
      email: "",
      mobile: "",
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/profile/search-streamers?page=1&limit=100`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  const handleAddUser = (data) => {
    setuserId(data._id);
    settournament_by(data.name);
    setSelectUser(data);
    setUsers([]);
    setName("");
  };

  useEffect(() => {
    if (
      !title.trim() ||
      !date.trim() ||
      !time.trim() ||
      !link.trim() ||
      !image ||
      !userId.trim()
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [title, date, time, link, image, userId]);

  const handleCreateTournament = () => {
    setDisable(true);
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("token", "");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("created_by", "admin");
    formdata.append("streaming_link", link);
    formdata.append("tournament_by", tournament_by);
    formdata.append("streaming_date", date);
    formdata.append("streaming_time", time);
    formdata.append("userId", userId);
    formdata.append("TournamentImage", image);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_BASE_URL}api/tournament/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTournaments(prev => [result.tournament, ...prev]);
        setTime("");
        setDate("");
        setTitle("");
        setLink("");
        setPrevImage("");
        setImage("");
        setSelectUser("");
        settournament_by("");
        setuserId("");
        setLoading(false);
        setOpenCreateModal(false);
      })
      .catch((error) => {
        setTime("");
        setDate("");
        setTitle("");
        setLink("");
        setPrevImage("");
        setImage("");
        setSelectUser("");
        settournament_by("");
        setuserId("");
        setLoading(false);
        setOpenCreateModal(false);
      });
  };

  useEffect(() => {
    if (page === 1) {
      setMainLoader(true);
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/tournament/?page=${page}&limit=${limit}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.tournaments.length);
        if (page === 1) {
          setTournaments(response.data.tournaments);
        } else {
          setTournaments((prev) => [...prev, ...response.data.tournaments]);
        }
        setMainLoader(false);
        setLoadPageBtn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleChangeName = e => {
    setSearchTitle(e.target.value)
  }

  return (
    <Layout>
      {/* Create a new stream */}
      <FullModal
        isOpen={openCreateModal}
        onClose={handleCloseCreateBannerModal}
        title={<Box className='banner_create_title'>Create new banner</Box>}
        body={
          <Box className='create_tour_body '>
            {/* Title */}
            <Inputcomp
              type='text'
              placeholder='Stream title'
              className='banner_input'
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
            />
            {/* Link */}
            <Inputcomp
              type='text'
              placeholder='provide Stream link'
              className='banner_input'
              value={link}
              handleChange={(e) => setLink(e.target.value)}
            />
            {/* Date */}
            <Inputcomp
              type='date'
              placeholder='provide Streaming date'
              className='banner_input'
              value={date}
              handleChange={(e) => setDate(e.target.value)}
            />
            {/* time */}
            <Inputcomp
              type='time'
              placeholder='provide Streaming time'
              className='banner_input'
              value={time}
              handleChange={(e) => setTime(e.target.value)}
            />
            {prevImage ? (
              <Box className='banner_image_preview_setion'>
                <Image src={prevImage} className='preview_image' />
                <Button className='close_prev_btn' onClick={handleCloseImage}>
                  <MdClose />
                </Button>
              </Box>
            ) : (
              <Box className='banner_image_section'>
                <label htmlFor='banner_image'>
                  <FiUpload className='banner_file_icon' />
                </label>
                <Input
                  type='file'
                  id='banner_image'
                  className='file_input'
                  onChange={(e) => handleImageChange(e)}
                />
              </Box>
            )}

            {/* Search User */}
            <Box className='user_section_section'>
              {selectUser && (
                <Box
                  className='select_user_section'
                  onClick={() => setSelectUser("")}>
                  {/* <Img src={selectUser.profile_img || Avatar} className="select_user_avatar" /> */}
                  <span className='select_user_name'>{selectUser.name}</span>
                  <IoMdClose className='cancel_icon' />
                </Box>
              )}
              <Inputcomp
                type='test'
                placeholder='Search user...'
                className='banner_input'
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
              {(users || []).length > 0 ? (
                <Box className='user_list_section'>
                  {users.map((data) => (
                    <Box
                      className='user_card'
                      data={data._id}
                      onClick={() => handleAddUser(data)}>
                      <Img
                        src={selectUser.profile_img || Avatar}
                        className='user_avatar'
                      />
                      <span className='user_name'>{data.name}</span>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        }
        footer={
          <Box className='create_banner_footer'>
            <ButtonComp
              loading={loading}
              disable={disable}
              className='banner_create_btn'
              disableClassName='disable_banner_create_btn'
              text='Save'
              handleClick={handleCreateTournament}
            />
          </Box>
        }
      />

      <Box className='banner_page_container'>
        {/* Header Section */}
        <Box className='header_section'>
          <Box className='header_back_section'>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>Tournament Management</span>
          </Box>
          {/* Name */}
          <InputComp
            type='name'
            placeholder={"Search tournament by title"}
            className={"search_input"}
            value={searchTitle}
            handleChange={(e) => handleChangeName(e)}
          />
          <Button
            className='create_banner_btn'
            onClick={() => setOpenCreateModal(true)}>
            Create stream
          </Button>
        </Box>

        <Box className='banner_section'>
          {
            !searchTitle.trim() ? <TableContainer>
            <Table variant='simple'>
              <Thead className='table_head'>
                <Tr>
                  <Th className='table_header_item'>SL NO</Th>
                  <Th className='table_header_item'>Title</Th>
                  <Th className='table_header_item'>Image</Th>
                  <Th className='table_header_item'>Stream Date</Th>
                  <Th className='table_header_item'>Stream Time</Th>
                  <Th className='table_header_item'>Status</Th>
                  <Th className='table_header_item'>Action</Th>
                </Tr>
              </Thead>
              {mainLoader ? (
                // Loader Section
                <Tr className='empty_table_row'>
                  <Td className='empty_table_row' colSpan='7'>
                    <Box className='empty_table_list'>
                      <Loader />
                    </Box>
                  </Td>
                </Tr>
              ) : (
                <>
                  {(tournaments || []).length > 0 ? (
                    // Rendering components
                    <>
                      {tournaments.map((data, index) => (
                        <Tbody key={data._id}>
                          <TournamentsComp data={data} index={index} />
                        </Tbody>
                      ))}

                      {count === limit && (
                        <Tr className='empty_table_row'>
                          <Td className='empty_table_row' colSpan='7'>
                            <Box className='loadmore_table_list'>
                              <Button
                                className='load_more_btn'
                                onClick={handleIncrementPage}>
                                {loadPageBtn ? <Spinner /> : <>Load More</>}
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      )}
                    </>
                  ) : (
                    // Empty list section
                    <Tr className='empty_table_row'>
                      <Td className='empty_table_row' colSpan='5'>
                        <Box className='empty_table_list'>No data found</Box>
                      </Td>
                    </Tr>
                  )}
                </>
              )}
            </Table>
          </TableContainer> : <>Search Stream</>
          }
          
        </Box>
      </Box>
    </Layout>
  );
};

export default TournamentPage;
