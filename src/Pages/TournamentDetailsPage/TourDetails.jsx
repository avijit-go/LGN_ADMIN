/** @format */

import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { MdKeyboardBackspace } from "react-icons/md";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import Loader from "../../Components/Loader/Loader";
import "./TourDetails.css";
import axios from "axios";
import TournamentImage from "../../Assets/image.png";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import Leaderboard from "./Leaderboard";
import { useSocket, socket } from "../../socket/socket.js";

const TourDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournamentDetails, setturnamentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState("one");
  useSocket();

  useEffect(() => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/tournament/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data)
        setturnamentDetails(response.data.result);
        setLoading(false);
        socket.emit("join room", response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <Box className='tournament_details_page_container'>
        {/* Header Section */}
        <Box className='tournament_page_header'>
          <Box>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>Tournament details</span>
          </Box>
        </Box>
        {!loading ? (
          <Box className='tournament_info_section'>
            {tournamentDetails ? (
              <>
                {/* Tournament Information */}
                <Box className='tournament_details_section'>
                  <Img
                    src={tournamentDetails.image || TournamentImage}
                    className='tournament_image'
                  />
                  <Box className='tournament_text_details'>
                    <span className='main_tournament_title'>
                      {tournamentDetails.title}
                    </span>
                    <br />
                    <span className='main_tournament_username'>
                      Created by {tournamentDetails.tournament_by}
                    </span>
                    <br />
                    <span className='main_tournament_time'>
                      Starts{tournamentDetails.streaming_date} :{" "}
                      {tournamentDetails.streaming_time}{" "}
                    </span>
                  </Box>
                </Box>
                {/* Tournament tab section */}
                <Box className='tournament_tab_section'>
                  <Button
                    onClick={() => setSelect("one")}
                    className={
                      select === "one" ? "tab_button select" : "tab_button"
                    }>
                    Question List
                  </Button>
                  <Button
                    onClick={() => setSelect("two")}
                    className={
                      select === "two" ? "tab_button select" : "tab_button"
                    }>
                    Create Question
                  </Button>

                  <Button
                    onClick={() => setSelect("three")}
                    className={
                      select === "three" ? "tab_button select" : "tab_button"
                    }>
                    Leaderboard
                  </Button>
                </Box>
                {/* Rendering tab content */}
                {select === "one" ? (
                  <QuestionList id={id} />
                ) : (
                  <>
                    {select === "two" ? (
                      <QuestionForm id={id} />
                    ) : (
                      <Leaderboard id={id} />
                    )}
                  </>
                )}
              </>
            ) : (
              <Box className='empty_table_list'>No data found</Box>
            )}
          </Box>
        ) : (
          <Box className='tournament_info_section_loader'>
            <Loader />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default TourDetails;
