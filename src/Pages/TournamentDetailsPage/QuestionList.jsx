/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Td,
  Spinner,
} from "@chakra-ui/react";
import QuestionComp from "../../Components/QuestionComp/QuestionComp";
import { useSocket, socket } from "../../socket/socket";
import Loader from "../../Components/Loader/Loader";

const QuestionList = ({ id }) => {
  useSocket();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(10);
  const [loadPageBtn, setLoadPageBtn] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/questions/${id}?page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.questions.length);
        if (page === 1) {
          setQuestions(response.data.questions);
        } else {
          setQuestions((prev) => [...prev, ...response.data.questions]);
        }
        setLoading(false);
        setLoadPageBtn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(">>>>>>>>>>>>>>>>>>>", data);
    });
  });

  const handleIncrementPage = () => {
    setLoadPageBtn(true);
    setPage((prev) => prev + 1);
  };

  return (
    <Box className='banner_section'>
      <TableContainer>
        <Table variant='simple'>
          <Thead className='table_head'>
            <Tr>
              <Th className='table_header_item'>SL NO</Th>
              <Th className='table_header_item'>Quesion</Th>
              <Th className='table_header_item'>Option A</Th>
              <Th className='table_header_item'>Option A Image</Th>
              <Th className='table_header_item'>Option B</Th>
              <Th className='table_header_item'>Option B Image</Th>
              <Th className='table_header_item'>Option C</Th>
              <Th className='table_header_item'>Option C Image</Th>
              <Th className='table_header_item'>Option D</Th>
              <Th className='table_header_item'>Option D Image</Th>
              <Th className='table_header_item'>status</Th>
              <Th className='table_header_item'>Coorect Option</Th>
              <Th className='table_header_item'>Action</Th>
            </Tr>
          </Thead>
          {loading ? (
            // Loader Section
            <Tr className='empty_table_row'>
              <Td className='empty_table_row' colSpan='13'>
                <Box className='empty_table_list'>
                  <Loader />
                </Box>
              </Td>
            </Tr>
          ) : (
            <>
              {(questions || []).length > 0 ? (
                // Rendering components
                <>
                  {questions.map((data, index) => (
                    <Tbody key={data._id}>
                      <QuestionComp data={data} index={index + 1} />
                    </Tbody>
                  ))}
                  {count === limit && (
                    <Tr className='empty_table_row'>
                      <Td className='empty_table_row' colSpan='13'>
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
                  <Td className='empty_table_row' colSpan='13'>
                    <Box className='empty_table_list'>No data found</Box>
                  </Td>
                </Tr>
              )}
            </>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuestionList;
