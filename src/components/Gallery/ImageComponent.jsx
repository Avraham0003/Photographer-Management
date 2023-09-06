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

function ImageComponent({
  photo,
  index,
  handleOpenModal,
  downloadImage,
  movingToggleDisable,
  movingToggleSelected,
}) {
  const buttongroup_style = {
    display: "flex",
    height: "130px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Popover key={index}>
      <PopoverTrigger>
        <Image
          border={photo.is_selected ? "4px solid #3182CE" : "none"}
          borderRadius={"lg"}
          filter={photo.disabled ? "grayscale(90%)" : "saturate(1.2)"}
          _hover={{
            filter: "brightness(0.60)",
            cursor: "pointer",
          }}
          objectFit="cover"
          w={["41vw", "36vw", "31vw", "26vw", "21vw"]}
          src={photo.src}
          alt={photo.name}
          loading="lazy"
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

              <Tooltip label={photo.is_selected ? "הסר מפיתוח" : "הוסף לפיתוח"}>
                <Button
                  colorScheme="purple"
                  onClick={() =>
                    movingToggleSelected(photo._id, !photo.is_selected)
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

              <Tooltip label={photo.disabled ? "שחזר תמונה" : "הסתר תמונה"}>
                <Button
                  colorScheme="red"
                  onClick={() =>
                    movingToggleDisable(photo.name, !photo.disabled)
                  }
                >
                  {photo.disabled ? <HiOutlineReply /> : <HiOutlineEyeOff />}
                </Button>
              </Tooltip>
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default ImageComponent;
