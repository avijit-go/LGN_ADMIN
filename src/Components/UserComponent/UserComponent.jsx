/** @format */

import React, { useState } from "react";
import {
  Box,
  Tr,
  Td,
  Img,
  Button,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import AlertModal from "../modalComp/AlertModal";
import InputComp from "../InputComp/InputComp";
import axios from "axios";
import { useSocket, socket } from "../../socket/socket";

const UserComponent = ({ data, index }) => {
  const toast = useToast();
  const [active, setActive] = useState(data.status || "active");
  const [accountType, setAccountType] = useState(data.accountType || "user");
  const [isDelete, setIsDelete] = useState(data.isDelete || false);
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAccounttypeModal, setOpenAccountType] = useState(false);
  const [message, setMessage] = useState("");
  const [profileId, setProfileId] = useState("");
  const [statusValue, setStatusValue] = useState("");
  useSocket();

  /* Handle Open activity status modal */
  const handleOpenActivityModal = (value, id) => {
    setOpenActiveModal(true);
    setProfileId(id);
    setStatusValue(value);
  };

  /* Update activity status API */
  const handleUpdateProfileActivity = () => {
    let data = JSON.stringify({
      status: statusValue,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/profile/update-status/${profileId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setOpenActiveModal(false);
        setActive(statusValue);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        /* From here we'll send notification to user */
        if (response.data.notification) {
          socket.emit("notification send", response.data.notification);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Handle accept streaming request */
  const handleAcceoptAccountType = (value, id) => {
    setOpenAccountType(true);
    setAccountType(value);
    setProfileId(id);
  };

  /* Handle delete profile modal */
  const handleProfileDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setProfileId(id);
  };

  /* Handle delete profile API */
  const handleDeleteProfile = () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/profile/delete-profile/${profileId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setOpenDeleteModal(false);
        setIsDelete(response.data.user.isDelete);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        /* Send notification to user */
        if (response.data.notification) {
          socket.emit("notification send", response.data.notification);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* HAndle update user's account type */
  const handleUpdateAccountType = () => {
    let data = JSON.stringify({
      accountType: accountType,
      message: message,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/profile/update-account-type/${profileId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setOpenAccountType(false);
        setAccountType(response.data.user.accountType);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        /* From here we'll send notification to user */
        if (response.data.notification) {
          socket.emit("notification send", response.data.notification);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isDelete && (
        <>
          {/* Change profile status modal */}
          {openActiveModal && (
            <AlertModal
              isOpen={openActiveModal}
              onClose={() => setOpenActiveModal(false)}
              title={<>Account activity</>}
              body={<>Do you want to mark inactive?</>}
              footer={
                <Button
                  className='modal_btn'
                  onClick={handleUpdateProfileActivity}>
                  Okay
                </Button>
              }
            />
          )}

          {/* Accept streaming request modal */}
          {openAccounttypeModal && (
            <AlertModal
              isOpen={openAccounttypeModal}
              onClose={() => setOpenAccountType(false)}
              title={<>Account activity</>}
              body={
                <>
                  <>Do you accept user's streaming request?</>
                  <Textarea
                    type='text'
                    placeholder={"Enter message here"}
                    className={"modal_message_input"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </>
              }
              footer={
                <Button className='modal_btn' onClick={handleUpdateAccountType}>
                  Okay
                </Button>
              }
            />
          )}

          {/* Delete profile status */}
          {openDeleteModal && (
            <AlertModal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              title={<>Delete account</>}
              body={<>Do you want to delete this account?</>}
              footer={
                <Button
                  className='modal_btn delete'
                  onClick={handleDeleteProfile}>
                  Delete
                </Button>
              }
            />
          )}

          <Tr>
            <Td className='td'>{index + 1}</Td>
            <Td className='td'>{data.name}</Td>
            <Td className='td'>{data.email}</Td>
            <Td className='td'>{data.mobile}</Td>

            {/* Profile status */}
            <Td className='td'>
              {active === "active" ? (
                <Button
                  className='active_btn active'
                  onClick={() => handleOpenActivityModal("inactive", data._id)}>
                  Active
                </Button>
              ) : (
                <Button
                  className='active_btn inactive'
                  onClick={() => handleOpenActivityModal("active", data._id)}>
                  Inactive
                </Button>
              )}
            </Td>

            {/* User account type like user or streamer */}
            <Td className='td'>
              <Menu>
                <MenuButton
                  as={Button}
                  className={
                    accountType === "user"
                      ? `active_btn user`
                      : accountType === "streamer"
                      ? "active_btn streamer"
                      : "active_btn pending"
                  }>
                  {accountType.toUpperCase()}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className='menu_item'
                    onClick={() => handleAcceoptAccountType("user", data._id)}>
                    User
                  </MenuItem>
                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handleAcceoptAccountType("streamer", data._id)
                    }>
                    Streamer
                  </MenuItem>
                  {/* <MenuItem>Mark as Draft</MenuItem> */}
                </MenuList>
              </Menu>
            </Td>

            {/* Delete user account */}
            <Td className='td'>
              <Button
                className='table_delete_btn'
                onClick={() => handleProfileDeleteModal(data._id)}>
                <AiOutlineDelete />
              </Button>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default UserComponent;
