/** @format */

import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./SupportPage.css";
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
} from "@chakra-ui/react";
import SupportComp from "../../Components/SupportComp/SupportComp";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/support-tickit`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setLists(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Box className='banner_page_container'>
        {/* Header Section */}
        <Box className='header_section'>
          <Box className='header_back_section'>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>Support Management</span>
          </Box>
        </Box>

        {/* Table Section */}
        <Box className='banner_section'>
          <TableContainer>
            <Table variant='simple'>
              <Thead className='table_head'>
                <Tr>   
                  <Th className='table_header_item'>SL NO</Th>
                  <Th className='table_header_item'>Name</Th>
                  <Th className='table_header_item'>Email</Th>
                  <Th className='table_header_item'>Subject</Th>
                  <Th className='table_header_item'>Message</Th>
                  <Th className='table_header_item'>created At</Th>
                </Tr>
              </Thead>
              {loading ? (
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
                  {(lists || []).length > 0 ? (
                    // Rendering components
                    <>
                      {lists.map((data, index) => (
                        <Tbody key={data._id}>
                          <SupportComp data={data} index={index} />
                        </Tbody>
                      ))}
                    </>
                  ) : (
                    // Empty list section
                    <Tr className='empty_table_row'>
                      <Td className='empty_table_row' colSpan='7'>
                        <Box className='empty_table_list'>No data found</Box>
                      </Td>
                    </Tr>
                  )}
                </>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default SupportPage;
