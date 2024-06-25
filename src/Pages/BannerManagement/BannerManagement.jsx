/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { GlobalContext } from "../../Context/Context";
import {
  Box,
  Button,
  Input,
  Image,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import "./BannerManagement.css";
import Loader from "../../Components/Loader/Loader";
import FullModal from "../../Components/modalComp/FullModal";
import Inputcomp from "../../Components/InputComp/InputComp";
import ButtonComp from "../../Components/ButtonComp/AuthButton";
import { FiUpload } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import axios from "axios";
import BannerComp from "../../Components/BannerComp/BannerComp";

function BannerManagement() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(3);
  const [loadPageBtn, setLoadPageBtn] = useState(false);
  const location = useLocation();
  const { setPagetype } = GlobalContext();
  const navigate = useNavigate();

  const handleIncrementPage = () => {
    setLoadPageBtn(true);
    setPage((prev) => prev + 1);
  };

  /* Handle close create banner modal */
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

  const handleCreateBanner = () => {
    setBtnLoading(true);
    setDisable(true);
    const myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    formdata.append("link", link);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}api/v1/banners`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          setName("");
          setLink("");
          setImage("");
          setPrevImage("");
          setBtnLoading(false);
          setOpenCreateModal(false);
          setBanners((prev) => [result.banner, ...prev]);
        }
      })
      .catch((error) => {
        setName("");
        setLink("");
        setImage("");
        setPrevImage("");
        setBtnLoading(false);
        setOpenCreateModal(false);
      });
  };

  useEffect(() => {
    if (!name.trim() || !prevImage.trim() || !link.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, link, prevImage]);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}api/v1/banners?page=${page}&limit=${limit}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setCount(response.data.data.length);
        if (page === 1) {
          setBanners(response.data.data);
        } else {
          setBanners((prev) => [...prev, ...response.data.data]);
        }
        setLoading(false);
        setLoadPageBtn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, limit]);

  return (
    <Layout>
      {openCreateModal && (
        <FullModal
          isOpen={openCreateModal}
          onClose={handleCloseCreateBannerModal}
          title={<Box className='banner_create_title'>Create new banner</Box>}
          body={
            <Box className='create_banner_body'>
              {/* Banner Name */}
              <Box className='banner_form_input'>
                <Box className='banner_input_title'>BANNER NAME</Box>
                <Inputcomp
                  type='text'
                  placeholder='Banner name'
                  className='banner_input'
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                />
              </Box>
              {/* Banner Redirect link */}
              <Box className='banner_form_input'>
                <Box className='banner_input_title'>REDIRECT LINK</Box>
                <Inputcomp
                  type='text'
                  placeholder='Banner redirect link'
                  className='banner_input'
                  value={link}
                  handleChange={(e) => setLink(e.target.value)}
                />
              </Box>

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
            </Box>
          }
          footer={
            <Box className='create_banner_footer'>
              <ButtonComp
                loading={btnLoading}
                disable={disable}
                className='banner_create_btn'
                disableClassName='disable_banner_create_btn'
                text='Save'
                handleClick={handleCreateBanner}
              />
            </Box>
          }
        />
      )}
      <Box className='banner_page_container'>
        {/* Header Section */}
        <Box className='header_section'>
          <Box className='header_back_section'>
            <Button className='back_button' onClick={() => navigate(-1)}>
              <MdKeyboardBackspace />
            </Button>
            <span className='header_title'>Create Banner</span>
          </Box>
          <Button
            className='create_banner_btn'
            onClick={() => setOpenCreateModal(true)}>
            Add Banner
          </Button>
        </Box>

        {/* Table Section */}
        <Box className='banner_section'>
          <TableContainer>
            <Table variant='simple'>
              <Thead className='table_head'>
                <Tr>
                  <Th className='table_header_item'>SL NO</Th>
                  <Th className='table_header_item'>Title</Th>
                  <Th className='table_header_item'>Image</Th>
                  <Th className='table_header_item'>Status</Th>
                  <Th className='table_header_item'>Action</Th>
                </Tr>
              </Thead>
              {loading ? (
                // Loader Section
                <Tr className='empty_table_row'>
                  <Td className='empty_table_row' colSpan='5'>
                    <Box className='empty_table_list'>
                      <Loader />
                    </Box>
                  </Td>
                </Tr>
              ) : (
                <>
                  {(banners || []).length > 0 ? (
                    // Rendering components
                    <>
                      {banners.map((data, index) => (
                        <Tbody key={data._id}>
                          <BannerComp data={data} index={index + 1} />
                        </Tbody>
                      ))}

                      {count === limit && (
                        <Tr className='empty_table_row'>
                          <Td className='empty_table_row' colSpan='5'>
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
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
}

export default BannerManagement;
