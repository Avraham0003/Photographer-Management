import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import axios from 'axios';

import Header from '../components/Header/Header';
import Gallery from '../components/Gallery/Gallery';

import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TabPanel, TabPanels, Tab, TabList, Tabs, Heading, Box, Icon, Spinner, Center } from '@chakra-ui/react';

function ShowAlbumPage() {
  // parameters ==>
  const { event_id } = useParams();
  const [eventPhotos, setEventPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  //Ordered Photos:
  const [allPhotos, setAllPhotos] = useState([]);
  const [disabledPhotos, setDisabledPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  //==>

  // Style ==>
  const buttongroup_style = {
    display: 'flex',
    height: '130px',
    justifyContent: 'center',
    alignItems: 'center'
  }
  //==>

  // Functions ==>

  async function getEventPhotos(event_id) {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_SERVER_URL + `/photos/get_photos_by_event_id/${event_id}`);
      setEventPhotos(response.data.photos);
    } catch (error) {
      console.error('Error retrieving event details:', error);
      throw error;
    }finally { 
      setLoading(false);
    }
  }

  //==================================

  async function toggleDisable(id, changeto) {
    try {
      const photo_id = id;
      const selected = changeto;

      await axios.post(import.meta.env.VITE_SERVER_URL + `/photos/toggledisable/`, {
        photo_id,
        changeto: selected
      });
      if (selected) {
        toast.success('התמונה הוסתרה');
      } else {
        toast.success('התמונה שוחזרה');
      }
      getEventPhotos(event_id);

    } catch (error) {
      console.error('Error retrieving photo details:', error);
      throw error;
    }
  }

  //==================================

  async function is_selected_change(id, is_selected) {
    const photo_id = id;
    const selected = is_selected;
    try {
      if (selected) {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL + `/photos/is_selected_change_to_false/${photo_id}`);
        toast.success('התמונה הוסרה מפיתוח');
        getEventPhotos(event_id);
      } else {
        await axios.get(import.meta.env.VITE_SERVER_URL + `/photos/is_selected_change_to_true/${photo_id}`);
        toast.success('התמונה נוספה לפיתוח');
        getEventPhotos(event_id);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      throw error;
    }
  }

  //==================================

  const downloadImage = (image) => {
    saveAs(image, image) // Put your image url here.
  }
  //==>  

  //UseEffects ==>

  useEffect(() => {
    getEventPhotos(event_id);
  }, [event_id]);

  useEffect(() => {
    if (eventPhotos) {
      setLoading(true);
      setAllPhotos([]);
      setSelectedPhotos([]);
      setDisabledPhotos([]);
  
      Promise.all(eventPhotos.map(async (photo) => {
        if (photo.disabled) {
          setDisabledPhotos(disabledPhotos => [...disabledPhotos, { name: photo._id, src: import.meta.env.VITE_SERVER_URL + '/' + photo.photo_link, is_selected: photo.is_selected, disabled: photo.disabled }]);
        } else {
          setAllPhotos(allPhotos => [...allPhotos, { name: photo._id, src: import.meta.env.VITE_SERVER_URL + '/' + photo.photo_link, is_selected: photo.is_selected, disabled: photo.disabled }]);
        }
        if (photo.is_selected) {
          setSelectedPhotos(selectedPhotos => [...selectedPhotos, { name: photo._id, src: import.meta.env.VITE_SERVER_URL + '/' + photo.photo_link, is_selected: photo.is_selected, disabled: photo.disabled }]);
        }
      }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error retrieving photo details:', error);
        setLoading(false);
      });
    }
  }, [eventPhotos]);
  

  //==================================


  return (
    <>
      <Header />
      {loading ? <Center><Spinner
        display={'block'}
        my={200}
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /></Center> : <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab padding={3} _hover={{ color: 'white', bg: 'blue.200' }} _selected={{ color: 'white', bg: 'blue.500' }} fontWeight={'bold'}>כל התמונות [{allPhotos.length}]</Tab>
          <Tab padding={3} _hover={{ color: 'white', bg: 'purple.200' }} _selected={{ color: 'white', bg: 'purple.500' }} fontWeight={'bold'}>תמונות לפיתוח [{selectedPhotos.length}]</Tab>
          <Tab padding={3} _hover={{ color: 'white', bg: 'red.200' }} _selected={{ color: 'white', bg: 'red.500' }} fontWeight={'bold'}>תמונות מוסתרות [{disabledPhotos.length}]</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading>כל התמונות</Heading>
            <Gallery toggleDisable={toggleDisable} is_selected_change={is_selected_change} downloadImage={downloadImage} images={allPhotos} />
          </TabPanel>

          <TabPanel>
            {selectedPhotos.length > 0 && <><Heading>תמונות לפיתוח</Heading> <Gallery is_selected_change={is_selected_change} downloadImage={downloadImage} images={selectedPhotos} /> </>}
            {selectedPhotos.length == 0 && <Box w={'100%'} px={10} textAlign={'center'} fontSize={'50px'} fontWeight={'bold'}>אין תמונות לפיתוח<Icon display={'inline'} as={HiOutlineExclamationCircle} /> </Box>}


          </TabPanel>

          <TabPanel>
            {disabledPhotos.length > 0 && <><Heading>תמונות מוסתרות</Heading><Gallery is_selected_change={is_selected_change} downloadImage={downloadImage} toggleDisable={toggleDisable} images={disabledPhotos} /></>}
            {disabledPhotos.length == 0 && <Box w={'100%'} px={10} textAlign={'center'} fontSize={'50px'} fontWeight={'bold'}>אין תמונות מוסתרות<Icon display={'inline'} as={HiOutlineExclamationCircle} /> </Box>}
          </TabPanel>
        </TabPanels>
      </Tabs>}
    </>
  );
}

export default ShowAlbumPage;
