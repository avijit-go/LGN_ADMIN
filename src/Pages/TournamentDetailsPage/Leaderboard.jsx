/** @format */

import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
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

const Leaderboard = ({ id }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/tournament/get-leaderboard-by-tournament/6667e9c9052fbfc9c1b043cb`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <Box className='question_form_section'>
      <TableContainer>
        <Table variant='simple'>
          <Thead className='table_head'>
            <Tr>
              <Th className='table_header_item'>SL NO</Th>
              <Th className='table_header_item'>User name</Th>
              <Th className='table_header_item'>Correct Prediction</Th>
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
              {(lists || []).length > 0 ? (
                // Rendering components
                <>
                  {/* {questions.map((data, index) => (
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
                  )} */}
                  RENDER
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

export default Leaderboard;
