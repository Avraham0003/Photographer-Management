/* imports : */

// packages
import axios from "axios";
import { toast } from "react-toastify";

// components

import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";

// UI libraries components

import { Box, Spinner, Center, Flex, Divider, Heading } from "@chakra-ui/react";

// hooks

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// slices

import { toggleDisable } from "../redux/slices/imagesSlices";
import { toggleSelected } from "../redux/slices/imagesSlices";
import { getImagesByEventId } from "../redux/slices/imagesSlices";

/* end imports */

function ShowAlbumPage() {
  const { event_id } = useParams();
  const [tabIndex, setTabIndex] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, images } = useSelector((store) => store.imagesSlice);

  const movingToggleDisable = async (imageId, status) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_URL + `/photos/toggleDisable`,
        {
          imageId,
          status,
        }
      );

      dispatch(toggleDisable({ imageId, status }));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const movingToggleSelected = async (imageId, status) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_URL + `/photos/toggleSelected`,
        {
          imageId,
          status,
        }
      );

      dispatch(toggleSelected({ imageId, status }));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {

    if(event_id) {
      if(!images) {
        dispatch(getImagesByEventId(event_id));
      }
    }
  }, [event_id]);

  return (
    <>
      <Header />
      {loading ? (
        <Center>
          <Spinner
            display={"block"}
            my={200}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : null}

      {error ? <Center>{error}</Center> : null}

      {!loading && !error && images !== null ? (
        <>
          {/* <Container w="container.sm"> */}
          <Flex fontWeight="bold" p="5" direction={["column", "row"]} gap="5">
            <Box
              onClick={() => {
                setTabIndex(1);
              }}
              color={tabIndex === 1 ? "white" : "black"}
              bg={tabIndex === 1 ? "blue.400" : "white"}
              _hover={
                tabIndex !== 1
                  ? {
                      cursor: "pointer",
                      bg: "blue.200",
                      color: "gray.600",
                    }
                  : { cursor: "default" }
              }
              py="2"
              rounded="md"
              boxShadow="xs"
              textAlign="center"
              w="100%"
            >
              כל התמונות [{images.allPhotos.length}]
            </Box>
            <Box
              onClick={() => {
                setTabIndex(2);
              }}
              color={tabIndex === 2 ? "white" : "black"}
              bg={tabIndex === 2 ? "green.500" : "white"}
              _hover={
                tabIndex !== 2
                  ? {
                      cursor: "pointer",
                      bg: "green.200",
                      color: "gray.600",
                    }
                  : { cursor: "default" }
              }
              py="2"
              rounded="md"
              boxShadow="xs"
              textAlign="center"
              w="100%"
            >
              נבחרו לפיתוח [{images.selectedPhotos.length}]
            </Box>
            <Box
              onClick={() => {
                setTabIndex(3);
              }}
              color={tabIndex === 3 ? "white" : "black"}
              bg={tabIndex === 3 ? "red.500" : "white"}
              _hover={
                tabIndex !== 3
                  ? {
                      cursor: "pointer",
                      bg: "red.200",
                      color: "gray.600",
                    }
                  : { cursor: "default" }
              }
              py="2"
              rounded="md"
              boxShadow="xs"
              textAlign="center"
              w="100%"
            >
              תמונות מוסתרות [{images.disabledPhotos.length}]
            </Box>
          </Flex>
          <Divider />
          <Gallery
            movingToggleSelected={movingToggleSelected}
            movingToggleDisable={movingToggleDisable}
            tabIndex={tabIndex}
            images={
              tabIndex === 1
                ? images.allPhotos
                : tabIndex === 2
                ? images.selectedPhotos
                : images.disabledPhotos
            }
          />
          {/* </Container> */}
        </>
      ) : null}
    </>
  );
}

export default ShowAlbumPage;

{
  /* <Tabs isFitted variant="enclosed">
<TabList mb="1em">
  <Tab
    padding={3}
    _hover={{ color: "white", bg: "blue.200" }}
    _selected={{ color: "white", bg: "blue.500" }}
    fontWeight={"bold"}
  >
    כל התמונות [{images.allPhotos.length}]
  </Tab>
  <Tab
    padding={3}
    _hover={{ color: "white", bg: "purple.200" }}
    _selected={{ color: "white", bg: "purple.500" }}
    fontWeight={"bold"}
  >
    תמונות לפיתוח [{images.selectedPhotos.length}]
  </Tab>
  <Tab
    padding={3}
    _hover={{ color: "white", bg: "red.200" }}
    _selected={{ color: "white", bg: "red.500" }}
    fontWeight={"bold"}
  >
    תמונות מוסתרות [{images.disabledPhotos.length}]
  </Tab>
</TabList>
<TabPanels>
  <TabPanel>
    <Heading>כל התמונות</Heading>
    <Gallery
      images={images.allPhotos}
    />
  </TabPanel>

  <TabPanel>
    {images.selectedPhotos.length > 0 && (
      <>
        <Heading>תמונות לפיתוח</Heading>{" "}
        <Gallery
          images={images.selectedPhotos}
        />
      </>
    )}
    {images.selectedPhotos.length == 0 && (
      <Box
        w={"100%"}
        px={10}
        textAlign={"center"}
        fontSize={"50px"}
        fontWeight={"bold"}
      >
        אין תמונות לפיתוח
        <Icon
          display={"inline"}
          as={HiOutlineExclamationCircle}
        />{" "}
      </Box>
    )}
  </TabPanel>

  <TabPanel>
    {images.disabledPhotos.length > 0 && (
      <>
        <Heading>תמונות מוסתרות</Heading>
        <Gallery
          images={images.disabledPhotos}
        />
      </>
    )}
    {images.disabledPhotos.length == 0 && (
      <Box
        w={"100%"}
        px={10}
        textAlign={"center"}
        fontSize={"50px"}
        fontWeight={"bold"}
      >
        אין תמונות מוסתרות
        <Icon
          display={"inline"}
          as={HiOutlineExclamationCircle}
        />{" "}
      </Box>
    )}
  </TabPanel>
</TabPanels>
</Tabs> */
}
