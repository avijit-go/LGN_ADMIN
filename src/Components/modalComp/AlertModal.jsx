import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const AlertModal = ({isOpen, onClose, title, body, footer}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {body}
          </ModalBody>

          <ModalFooter>
            {footer}
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default AlertModal