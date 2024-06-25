/** @format */

import React from "react";
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
  Spinner,
} from "@chakra-ui/react";
import UserComponent from "../../Components/UserComponent/UserComponent";
import Loader from "../../Components/Loader/Loader";

const SearchUserList = ({
  users,
  count,
  limit,
  handleIncrementPage,
  loading,
  loadPageBtn,
}) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead className='table_head'>
          <Tr>
            <Th className='table_header_item'>SL NO</Th>
            <Th className='table_header_item'>Name</Th>
            <Th className='table_header_item'>Email</Th>
            <Th className='table_header_item'>Mobile</Th>
            <Th className='table_header_item'>Status</Th>
            <Th className='table_header_item'>Stream request</Th>
            <Th className='table_header_item'>Action</Th>
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
            {(users || []).length > 0 ? (
              // Rendering components
              <>
                {users.map((data, index) => (
                  <Tbody key={data._id}>
                    <UserComponent data={data} index={index} />
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
                <Td className='empty_table_row' colSpan='7'>
                  <Box className='empty_table_list'>No data found</Box>
                </Td>
              </Tr>
            )}
          </>
        )}
      </Table>
    </TableContainer>
  );
};

export default SearchUserList;
