import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Center } from '@chakra-ui/react';
import { HiOutlineUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';

const UploadPhotosForm = (event_id) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [files, setFiles] = useState([]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    fileUpload(files).then((response) => {
      console.log(response.data);
      toast.success('התמונות עלו בהצלחה');
    });
  };

  const onChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const fileUpload = (files) => {
    const url = import.meta.env.VITE_SERVER_URL+`/photos/upload/${event_id.event_id}`;
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true
    };
    return axios.post(url, formData, config);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} textAlign={'center'}>
        <ModalOverlay />
        <ModalContent textAlign={'center'}>


          <ModalHeader>הוספת תמונות לאלבום</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={10}>

            <form onSubmit={onFormSubmit}>
              <input type="file" onChange={onChange} multiple />
              <Button type='submit' m={10}>העלה תמונות</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen} colorScheme="green" mr={"20%"}>העלה תמונות&nbsp;<HiOutlineUpload /> </Button>
    </>
  );
};

export default UploadPhotosForm;
