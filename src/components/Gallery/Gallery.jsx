import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Flex, Image, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Tooltip } from '@chakra-ui/react';
import Modal from './Modal';
import { HiDownload, HiOutlineEye, HiOutlineEyeOff, HiOutlineCollection, HiOutlineReply, HiX } from 'react-icons/hi';

function Gallery({ images, downloadImage, is_selected_change, toggleDisable }) {
  const buttongroup_style = {
    display: 'flex',
    height: '130px',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setInitialImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Flex gap="0.8vw" wrap="wrap" justify="center">
        {images.map((photo, index) => (
            <Popover key={index} >
              <PopoverTrigger>
                <Image
                  border= {photo.is_selected ? '5px solid #3182CE' : 'none'}
                  borderRadius={'lg'}
                  filter="saturate(1.2)"
                  _hover={{
                    filter: 'brightness(0.60)',
                    cursor: 'pointer',
                  }}
                  objectFit="cover"
                  w={['41vw', '36vw', '31vw', '26vw', '21vw']}
                  src={photo.src}
                  alt={photo.name}
                />

              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <ButtonGroup sx={{ buttongroup_style }} spacing='3' alignContent='bottom'>
                      <Tooltip label="הצג תמונה">
                        <Button colorScheme='blue' onClick={() => handleOpenModal(index)}><HiOutlineEye /></Button>
                      </Tooltip>
                      {!photo.is_selected && <Tooltip label="הוסף לפיתוח">
                        <Button colorScheme='purple' onClick={() => is_selected_change(photo.name, photo.is_selected)}><HiOutlineCollection /></Button>
                      </Tooltip>}
                      {photo.is_selected && <Tooltip label="הסר מפיתוח">
                        <Button colorScheme='purple' onClick={() => is_selected_change(photo.name, photo.is_selected)}><HiX /></Button>
                      </Tooltip>}
                      <Tooltip label="הורד תמונה">
                        <Button colorScheme="green" onClick={() => downloadImage(photo.src)}>
                          <HiDownload />
                        </Button>
                      </Tooltip>
                      {!photo.disabled && <Tooltip label="הסתר תמונה">
                        <Button colorScheme='red' onClick={() => toggleDisable(photo.name, !photo.disabled)}><HiOutlineEyeOff /></Button>
                      </Tooltip>}
                      {photo.disabled && <Tooltip label="שחזר תמונה">
                        <Button colorScheme='red' onClick={() => toggleDisable(photo.name, !photo.disabled)}><HiOutlineReply /></Button>
                      </Tooltip>}
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
        ))}
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} images={images} initialImageIndex={initialImageIndex} />
    </>
  );
}

export default Gallery;
