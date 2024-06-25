import React, { useState } from 'react'
import {
    Box,
    Tr,
    Td,
    Img,Button, 
  } from '@chakra-ui/react';
  import timeDifference from "../../utils/getTime";

const SupportComp = ({data, index}) => {
  return (
    <Tr>
            <Td className="td">{index+1}</Td>
            <Td className="td">{data.name}</Td>
            <Td className="td">
                {data.email}
            </Td>
            <Td className="td">
                {data.subject}
            </Td>
            <Td className="td">
                {data.message}
            </Td>
            <Td className="td notification_decription">
                {timeDifference(new Date(), new Date(data.createdAt))}
            </Td>
        </Tr>
  )
}

export default SupportComp