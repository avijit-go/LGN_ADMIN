/** @format */

import React, { useEffect, useState } from "react";
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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import AlertModal from "../modalComp/AlertModal";
import FullModal from "../modalComp/FullModal";
import Inputcomp from "../../Components/InputComp/InputComp";
import { useSocket, socket } from "../../socket/socket";

const QuestionComp = ({ data, index }) => {
  const toast = useToast();
  useSocket();
  const [status, setStatus] = useState(data.status);
  const [openStatusModal, setOpenstatusModal] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [updateValue, setupdateValue] = useState("");
  const [correctOption, setcorrectOption] = useState(data.correctOption || "");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(data.isDelete || false);

  const handleChangestatus = (id, value) => {
    setQuestionId(id);
    setOpenstatusModal(true);
    setupdateValue(value);
  };

  const handlechangeOption = () => {
    let data = JSON.stringify({
      status: updateValue,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/questions/update-status/${questionId}`,
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
        setStatus(response.data.question.status);
        setOpenstatusModal(false);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        socket.emit("tournament notification", response.data.question);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlechangeAnswerOption = (value, id) => {
    let data = JSON.stringify({
      option: value,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/questions/update-answer/${id}`,
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
        setcorrectOption(response.data.question.correctOption);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        socket.emit("tournament notification", response.data.question);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setQuestionId(id);
  };

  const handleDeleteQuestion = () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/questions/delete-question/${questionId}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setIsDelete(response.data.question.isDelete);
        setOpenDeleteModal(false);
        toast({
          title: "Success.",
          description: `${response.data.message}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {openStatusModal && (
        <AlertModal
          isOpen={openStatusModal}
          onClose={() => setOpenstatusModal(false)}
          title={<>Question status</>}
          body={<Box>Do you want to change question status?</Box>}
          footer={
            <Box>
              <Button className='modal_btn' onClick={handlechangeOption}>
                Okay
              </Button>
            </Box>
          }
        />
      )}

      {openDeleteModal && (
        <AlertModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title={<>Question Delete</>}
          body={<Box>Do you want to delete this question?</Box>}
          footer={
            <Box>
              <Button
                className='modal_btn delete'
                onClick={handleDeleteQuestion}>
                Delete
              </Button>
            </Box>
          }
        />
      )}
      {!isDelete && (
        <Tr>
          <Td className='td'>{index}</Td>
          <Td className='td'>{data.question}</Td>
          <Td className='td'>{data.optionA.text}</Td>
          <Td className='td'>
            <Img src={data.optionA.image} className='option_image' />
          </Td>
          <Td className='td'>{data.optionB.text}</Td>
          <Td className='td'>
            <Img src={data.optionB.image} className='option_image' />
          </Td>
          <Td className='td'>{data.optionC.text}</Td>
          <Td className='td'>
            <Img src={data.optionC.image} className='option_image' />
          </Td>
          <Td className='td'>{data.optionD.text}</Td>
          <Td className='td'>
            <Img src={data.optionD.image} className='option_image' />
          </Td>
          {/* <Td className="td">{data.createdAt}</Td> */}
          <Td className='td'>
            {status === "active" ? (
              <Button
                className='table_btn active'
                onClick={() => handleChangestatus(data._id, "inactive")}>
                Active
              </Button>
            ) : (
              <Button
                className='table_btn inactive'
                onClick={() => handleChangestatus(data._id, "active")}>
                Inactive
              </Button>
            )}
          </Td>
          <Td className='td'>
            {correctOption.trim() ? (
              <>{correctOption}</>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  className={
                    status === "active"
                      ? `active_btn user`
                      : "active_btn pending"
                  }>
                  {data.correctOption.toUpperCase() || <>Option</>}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handlechangeAnswerOption("optionA", data._id)
                    }>
                    Option A
                  </MenuItem>

                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handlechangeAnswerOption("optionB", data._id)
                    }>
                    Option B
                  </MenuItem>

                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handlechangeAnswerOption("optionC", data._id)
                    }>
                    Option C
                  </MenuItem>

                  <MenuItem
                    className='menu_item'
                    onClick={() =>
                      handlechangeAnswerOption("optionD", data._id)
                    }>
                    Option D
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Td>

          <Td className='td'>
            <Button
              className='table_delete_btn'
              onClick={() => handleOpenDeleteModal(data._id)}>
              <AiOutlineDelete />
            </Button>

            <Button className='table_edit_btn'>
              <FaRegEdit />
            </Button>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default QuestionComp;
