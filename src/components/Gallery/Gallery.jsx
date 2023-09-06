import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import {
  Flex
} from "@chakra-ui/react";
import Modal from "./Modal";
import ImageComponent from "./ImageComponent";

function Gallery({ images, movingToggleDisable, movingToggleSelected }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const handleOpenModal = (index) => {
    setInitialImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const downloadImage = (image) => {
    saveAs(image, image); // Put your image url here.
  };

  return (
    <>
      <Flex my="2em" gap="0.8vw" wrap="wrap" justify="center">
        {images.map((photo, index) => (
          <ImageComponent
            key={photo.name}
            photo={photo}
            index={index}
            handleOpenModal={handleOpenModal}
            downloadImage={downloadImage}
            movingToggleDisable={movingToggleDisable}
            movingToggleSelected={movingToggleSelected}
          />
        ))}
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={images}
        initialImageIndex={initialImageIndex}
        movingToggleDisable={movingToggleDisable}
        movingToggleSelected={movingToggleSelected}
      />
    </>
  );
}

export default Gallery;
