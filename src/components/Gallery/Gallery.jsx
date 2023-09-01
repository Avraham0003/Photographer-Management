import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Tooltip,
} from "@chakra-ui/react";
import Modal from "./Modal";
import {
  HiDownload,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCollection,
  HiOutlineReply,
  HiX,
} from "react-icons/hi";
import { useImagesContext } from "../../context/ImagesContext";




function Gallery({ images, setImages }) {

  const {toggleSelected, toggleDisable, downloadImage} = useImagesContext();



  const buttongroup_style = {
    display: "flex",
    height: "130px",
    justifyContent: "center",
    alignItems: "center",
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
          <Popover key={index}>
            <PopoverTrigger>
              <Image
                border={
                  photo.is_selected
                    ? "5px solid #3182CE"
                    : photo.disabled
                    ? "5px solid red"
                    : "none"
                }
                borderRadius={"lg"}
                filter="saturate(1.2)"
                _hover={{
                  filter: "brightness(0.60)",
                  cursor: "pointer",
                }}
                objectFit="cover"
                w={["41vw", "36vw", "31vw", "26vw", "21vw"]}
                src={photo.src}
                alt={photo.name}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <ButtonGroup
                    sx={{ buttongroup_style }}
                    spacing="3"
                    alignContent="bottom"
                  >
                    <Tooltip label="הצג תמונה">
                      <Button
                        colorScheme="blue"
                        onClick={() => handleOpenModal(index)}
                      >
                        <HiOutlineEye />
                      </Button>
                    </Tooltip>

                    <Tooltip
                      label={photo.is_selected ? "הסר מפיתוח" : "הוסף לפיתוח"}
                    >
                      <Button
                        colorScheme="purple"
                        onClick={() =>
                          toggleSelected(photo._id, !photo.is_selected)
                        }
                      >
                        {photo.is_selected ? <HiX /> : <HiOutlineCollection />}
                      </Button>
                    </Tooltip>

                    <Tooltip label="הורד תמונה">
                      <Button
                        colorScheme="green"
                        onClick={() => downloadImage(photo.src)}
                      >
                        <HiDownload />
                      </Button>
                    </Tooltip>

                    <Tooltip
                      label={photo.disabled ? "שחזר תמונה" : "הסתר תמונה"}
                    >
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          toggleDisable(photo.name, !photo.disabled)
                        }
                      >
                        {photo.disabled ? (
                          <HiOutlineReply />
                        ) : (
                          <HiOutlineEyeOff />
                        )}
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        ))}
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={images}
        setImages={setImages}
        initialImageIndex={initialImageIndex}
      />
    </>
  );
}

export default Gallery;
