/** @format */

import React, { useState } from "react";
import {
  Box,
  Tr,
  Td,
  Img,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import axios from "axios";
import AlertModal from "../modalComp/AlertModal";
import TourImage from "../../Assets/image.png";
import { useNavigate } from "react-router-dom";
import { useSocket, socket } from "../../socket/socket";

const TournamentsComp = ({ data, index }) => {
  const toast = useToast();
  const navigate = useNavigate();
  useSocket();
  const [isDelete, setIsDelete] = useState(data.is_deleted || false);
  const [tournamentId, setTournamentId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [handleOpenStatusModal, setHandleOpenStatusModal] = useState(false);
  const [status, setStatus] = useState(data.is_active);
  const [statusValue, setStatusValue] = useState("");

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setTournamentId(id);
  };

  const handleDeleteTournament = () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/tournament/${tournamentId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setOpenDeleteModal(false);
        setIsDelete(response.data.tournment.is_deleted);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        if (response.data.notification) {
          socket.emit("notification send", response.data.notification);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenDeleteModal(true);
      });
  };

  const handleChangeStatusModal = (value, id) => {
    setStatusValue(value);
    setTournamentId(id);
    setHandleOpenStatusModal(true);
  };

  const handleChangeStatus = () => {
    let data = JSON.stringify({
      is_active: statusValue,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/tournament/update-status/${tournamentId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setStatus(response.data.tournment.is_active);
        setHandleOpenStatusModal(false);
        toast({
          title: "Success.",
          description: `${response.data.mesage}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        if (response.data.notification) {
          socket.emit("notification send", response.data.notification);
        }
      })
      .catch((error) => {
        console.log(error);
        setHandleOpenStatusModal(false);
      });
  };

  return (
    <>
      {handleOpenStatusModal && (
        <AlertModal
          isOpen={handleOpenStatusModal}
          onClose={() => setHandleOpenStatusModal(false)}
          title={<>Status tournamnet</>}
          body={<Box>Do you want to change tournament status?</Box>}
          footer={
            <Box>
              <Button className='modal_btn' onClick={handleChangeStatus}>
                Yes!
              </Button>
            </Box>
          }
        />
      )}
      {openDeleteModal && (
        <AlertModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title={<>Delete tournamnet</>}
          body={<Box>Do you want to delete this tournament?</Box>}
          footer={
            <Box>
              <Button
                className='modal_btn delete'
                onClick={handleDeleteTournament}>
                Delete
              </Button>
            </Box>
          }
        />
      )}

      {!isDelete && (
        <Tr>
          <Td className='td'>{index + 1}</Td>
          <Td className='td'>{data.title}</Td>
          <Td className='td'>
            <Img src={data.image || TourImage} className='table_image' />
          </Td>
          <Td className='td'>{data.streaming_date}</Td>
          <Td className='td'>{data.streaming_time}</Td>
          <Td className='td'>
            <Td className='td'>
              <Menu>
                <MenuButton
                  as={Button}
                  className={
                    status === "pending"
                      ? `active_btn user`
                      : status === "active"
                      ? "active_btn active"
                      : "active_btn inactive"
                  }>
                  {status.toUpperCase()}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className='menu_item'
                    onClick={() => handleChangeStatusModal("active", data._id)}>
                    Active
                  </MenuItem>
                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handleChangeStatusModal("inactive", data._id)
                    }>
                    Inactive
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Td>
          <Td className='td'>
            <Button
              className='table_delete_btn'
              onClick={() => handleOpenDeleteModal(data._id)}>
              <AiOutlineDelete />
            </Button>

            <Button
              className='table_edit_btn'
              onClick={() => navigate(`/tournament-details/${data._id}`)}>
              <FaRegEye />
            </Button>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default TournamentsComp;
