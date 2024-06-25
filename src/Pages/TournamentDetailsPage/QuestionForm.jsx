/** @format */

import React, { useEffect, useState } from "react";
import { Box, Textarea, useToast, Input } from "@chakra-ui/react";
import InputComp from "../../Components/InputComp/InputComp";
import ButtonComp from "../../Components/ButtonComp/AuthButton";
import axios from "axios";

const QuestionForm = ({ id }) => {
  const toast = useToast();
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt1Img, setOpt1Img] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt2Img, setOpt2Img] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt3Img, setOpt3Img] = useState("");
  const [opt4, setOpt4] = useState("");
  const [opt4Img, setOpt4Img] = useState("");
  const [disable, setdisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !question.trim() ||
      !opt1.trim() ||
      !opt2.trim() ||
      !opt3.trim() ||
      !opt4.trim()
    ) {
      setdisable(true);
    } else {
      setdisable(false);
    }
  }, [question, opt1, opt2, opt3, opt4]);

  const handleImageChange1 = (e) => {
    setOpt1Img(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setOpt2Img(e.target.files[0]);
  };

  const handleImageChange3 = (e) => {
    setOpt3Img(e.target.files[0]);
  };

  const handleImageChange4 = (e) => {
    setOpt4Img(e.target.files[0]);
  };

  const handleAskQuestion = () => {
    setdisable(true);
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const formdata = new FormData();
    formdata.append("question", question);
    formdata.append("tourId", id);
    formdata.append("opt1", opt1);
    formdata.append("image1", opt1Img);
    formdata.append("opt2", opt2);
    formdata.append("image2", opt2Img);
    formdata.append("opt3", opt3);
    formdata.append("image3", opt3Img);
    formdata.append("opt4", opt4);
    formdata.append("image4", opt4Img);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}api/v1/questions/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast({
            title: "Account created.",
            description: "Question has been created",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setOpt1("");
          setOpt1Img("");
          setOpt2("");
          setOpt2Img("");
          setOpt3("");
          setOpt3Img("");
          setOpt4("");
          setOpt4Img("");
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box className='question_form_section'>
      <Textarea
        type='text'
        placeholder='Ask question?'
        className='textarea_input_form'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Options */}
      <Box className='option_box'>
        <Box className='option_header'>Option A</Box>
        <InputComp
          type='text'
          placeholder={"Enter first option"}
          className={"option_input"}
          value={opt1}
          handleChange={(e) => setOpt1(e.target.value)}
        />
        <br />
        <Input
          type='file'
          className={"option_input"}
          onChange={(e) => handleImageChange1(e)}
        />
      </Box>

      <Box className='option_box'>
        <Box className='option_header'>Option B</Box>
        <InputComp
          type='text'
          placeholder={"Enter second option"}
          className={"option_input"}
          value={opt2}
          handleChange={(e) => setOpt2(e.target.value)}
        />
        <br />
        <Input
          type='file'
          className={"option_input"}
          onChange={(e) => handleImageChange2(e)}
        />
      </Box>

      <Box className='option_box'>
        <Box className='option_header'>Option B</Box>
        <InputComp
          type='text'
          placeholder={"Enter third option"}
          className={"option_input"}
          value={opt3}
          handleChange={(e) => setOpt3(e.target.value)}
        />
        <br />
        <Input
          type='file'
          className={"option_input"}
          onChange={(e) => handleImageChange3(e)}
        />
      </Box>

      <Box className='option_box'>
        <Box className='option_header'>Option D</Box>
        <InputComp
          type='text'
          placeholder={"Enter fourth option"}
          className={"option_input"}
          value={opt4}
          handleChange={(e) => setOpt4(e.target.value)}
        />
        <br />
        <Input
          type='file'
          className={"option_input"}
          onChange={(e) => handleImageChange4(e)}
        />
      </Box>

      <ButtonComp
        disable={disable}
        loading={loading}
        className={"create_question_btn"}
        disableClassName={"disable_create_question_btn"}
        text={"Create Question"}
        handleClick={handleAskQuestion}
      />
    </Box>
  );
};

export default QuestionForm;
