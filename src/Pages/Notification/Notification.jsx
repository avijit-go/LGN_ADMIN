/** @format */

import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import "./Notification.css";
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
  Td,Spinner
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotificationComp from "../../Components/NotificationComp/NotificationComp";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import {GlobalContext} from "../../Context/Context"


const Notification = () => {
  const {notifications, setNotifications} = GlobalContext();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if(page === 1) {
      setLoading(true);
    }
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/profile/admin-notification?page=${page}&limit=${limit}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      setCount(response.data.notifictions.length)
      if(page === 1) {
        setNotifications(response.data.notifictions)
      } else {
        setNotifications(prev => [...prev, ...response.data.notifictions])
      }
      setLoading(false);
      setPaginationLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [page]);

  const handleIncrementPage = () => {
    setPaginationLoading(true);
    setPage(prev => prev +1);
  }

  return (
    <Layout>
      <Box className='banner_page_container'>
        {/* Header Section */}
        <Box className='header_section'>
          <Box className='header_back_section'>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>Notification Management</span>
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
                  <Th className='table_header_item'>Description</Th>
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
                  {(notifications || []).length > 0 ? (
                    // Rendering components
                    <>
                      {notifications.map((data, index) => (
                        <Tbody key={data._id}>
                          <NotificationComp data={data} index={index} />
                        </Tbody>
                      ))}
                      {count === limit && (
                        <Tr className='empty_table_row'>
                          <Td className='empty_table_row' colSpan='5'>
                            <Box className='loadmore_table_list'>
                              <Button
                                className='load_more_btn'
                                onClick={handleIncrementPage}>
                                {paginationLoading ? <Spinner /> : <>Load More</>}
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      )}
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

export default Notification;
