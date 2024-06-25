import React from 'react'
import {
    Box,
    Tr,
    Td,
    Img,Button, 
    Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import notificationType from "../../Config/notification"


const NotificationComp = ({data, index}) => {
  console.log(data)
  console.log("notificationType")
  return (
    <>
        <Tr>
            <Td className='td'>{index + 1}</Td>
            <Td className='td'>{data.user.name}</Td>
            <Td className='td notification_decription'>{notificationType[data.type]}</Td>
        </Tr>
    </>
  )
}

export default NotificationComp