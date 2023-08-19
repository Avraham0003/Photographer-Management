import { Center, Image, Button ,ButtonGroup,Tooltip} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { HiChevronRight, HiOutlineX, HiChevronLeft,HiDownload, HiOutlineEyeOff, HiOutlineCollection, HiX  } from "react-icons/hi";

const buttongroup_style = {
  display: 'flex',
  height: '130px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,1)'
}

const modalStyles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalContent: {
    position: "relative",
    padding: "20px",
    borderRadius: "4px",
    maxWidth: "900px",
    textAlign: "center",
  },
  closeButton: {
    color: "white",
    position: "absolute",
    top: "20px",
    right: "50px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "55px",
  },
  carouselButtons: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 999,
  },
  carouselButton: {
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "55px",
    color: "white"
  },
  image: {
    maxWidth: "85%",
    maxHeight: "500px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
};

const Modal = ({ isOpen, onClose, images, initialImageIndex }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    setCurrentImageIndex(initialImageIndex || 0);
  }, [initialImageIndex]);
  
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
    prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
    prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  const handleImageClick = () => {
    handleNextImage();
  };
  
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if(event.key === 'ArrowRight'){
        handleNextImage();
      }else if(event.key === 'ArrowLeft'){
        handlePreviousImage();
      }
    },true);
  },[]);

  if (!isOpen) {
    return null;
  }
  
  return (
    <div style={modalStyles.modal} onClick={handleOutsideClick}>
      <div style={modalStyles.modalContent}>
        <Center px={["10%", "5%"]}>
          <Image
            objectFit="cover"
            src={images[currentImageIndex].src}
            alt={`Image ${currentImageIndex + 1}`}
            style={{
              ...modalStyles.image,
              transform: "scale(1.5)",
            }}
            onClick={handleImageClick}
          />
        </Center>
        <ButtonGroup sx={{ buttongroup_style }} spacing='3' alignContent='bottom'>
          <Tooltip label="הוסף לפיתוח">
            <Button colorScheme='purple' onClick={() => is_selected_change(photo.name, photo.is_selected)}><HiOutlineCollection /></Button>
          </Tooltip>
          <Tooltip label="הסר מפיתוח">
            <Button colorScheme='purple' onClick={() => is_selected_change(photo.name, photo.is_selected)}><HiX /></Button>
          </Tooltip>
          <Tooltip label="הורד תמונה">
            <Button colorScheme="green" onClick={() => downloadImage(photo.src)}>
              <HiDownload />
            </Button>
          </Tooltip>
          <Tooltip label="הסתר תמונה">
            <Button colorScheme="red" onClick={() => confirm('Are you sure?')}>
              <HiOutlineEyeOff />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <button
        _hover={{ color: "white" }}
        style={modalStyles.closeButton}
        onClick={onClose}
      >
        <HiOutlineX />
      </button>
      <div style={modalStyles.carouselButtons}>
        <button
          style={{ ...modalStyles.carouselButton, ...modalStyles.prevButton }}
          onClick={handlePreviousImage}
        >
          <HiChevronRight />
        </button>
        <button
          style={{ ...modalStyles.carouselButton, ...modalStyles.nextButton }}
          onClick={handleNextImage}
        >
          <HiChevronLeft />
        </button>
      </div>
    </div>
  );
};

export default Modal;
