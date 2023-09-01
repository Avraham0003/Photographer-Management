import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import { useImagesContext } from "../context/ImagesContext";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  Heading,
  Box,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";

function ShowAlbumPage() {
  // parameters ==>
  const { event_id } = useParams();
  const {
    getEventPhotos,
    images,
    toggleDisable,
    toggleSelected,
    downloadImage,
    loading,
    error
  } = useImagesContext();

  useEffect(() => {
    getEventPhotos(event_id)
  }, []);

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

      {!loading && !error ? (
        <Tabs isFitted variant="enclosed">
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
        </Tabs>
      ) : null}
    </>
  );
}

export default ShowAlbumPage;
