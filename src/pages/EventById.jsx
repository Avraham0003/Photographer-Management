import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { Stack, StackDivider, Box, Text, Card, CardHeader, CardBody, Heading, Button, Center, CardFooter, ButtonGroup  } from '@chakra-ui/react' 
import { HiOutlineTrash, HiOutlineLink } from 'react-icons/hi'
import UploadPhotosForm from '../components/UploadPhotosForm/UploadPhotosForm';
import EditEvent from '../components/EditEventForm/EditEvent';
import { toast } from 'react-toastify';
import { getImagesByEventId } from "../redux/slices/imagesSlices";
import { useDispatch, useSelector } from 'react-redux';



async function getEventDetails(event_id) {
  try {
    const response = await axios.get(import.meta.env.VITE_SERVER_URL+`/events/get_by_id/${event_id}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving event details:', error);
    throw error;
  }
}


const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function EventById() {


  const [eventData, setEventData] = useState(null);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {loading, error, images} = useSelector((store) => store.imagesSlice);

  function deleteClick() {
    if(confirm('האם אתה בטוח שברצונך למחוק את האירוע ?')){
      
      axios.delete(import.meta.env.VITE_SERVER_URL+`/events/delete/${event_id}`);
      navigate("/controlpanel");
      toast.warn('האירוע נמחק בהצלחה');
    }
    
  }
  
  
  const [formatedDate, setFormatedDate] = useState('');
  const { event_id } = useParams();
  
  useEffect(() => {
    getEventDetails(event_id)
    .then(event => {
      setEventData(event);        
    })
    .catch(error => {
      console.log(error);
    });
  }, [event_id]);
  useEffect(() => {
    if(eventData != null){
      setFormatedDate(formatDate(eventData.event_date));
    }
  },[eventData])
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
      <Center>

      <Card width={["90%","60%"]} marginTop={'5vh'}>
        <CardHeader>
          <Text textAlign={"center"} bg={'black'}  bgGradient='linear(to-l, #4760ff, #0dccff)'
  bgClip='text'
  fontSize='5xl'
  fontWeight='bold'>{eventData?.event_name}</Text>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
          <Heading size={'md'}>פרטי האירוע</Heading>

          <Box>
              <Heading size='xs' textTransform='uppercase'>
                שם האירוע:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {eventData?.event_name}
              </Text>
            </Box>


            <Box>
              <Heading size='xs' textTransform='uppercase'>
                תאריך:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {formatedDate}
              </Text>
            </Box>

            <Box>
              <Heading size='xs' textTransform='uppercase'>
                סוג האירוע:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {eventData?.event_type}
              </Text>
            </Box>

            <Box>
              <Heading size='xs' textTransform='uppercase'>
              בעל האירוע:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {eventData?.event_owner}
              </Text>
            </Box>

            <Box>
              <Heading size='xs' textTransform='uppercase'>
                אולם:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {eventData?.event_hall}
              </Text>
            </Box>

            <Box>
              <Heading size='xs' textTransform='uppercase'>
                צלמים:
              </Heading>
              <Text pt='2' fontSize='sm'>
                {eventData?.event_photographers}
              </Text>
            </Box>

          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup variant='outline' display={'flex'} flexWrap={'wrap'}>
            <Button onClick={deleteClick} colorScheme='red'>מחק אירוע&nbsp;<HiOutlineTrash /></Button>
            <EditEvent eventData={eventData} date={formatedDate} setEventData={setEventData} />
            <Button colorScheme='blue'>קישורים ללקוח&nbsp;<HiOutlineLink /></Button>
            <Button onClick={() => navigate(`/showalbum/${event_id}`)} colorScheme='purple'>כניסה לאלבום&nbsp;<HiOutlineLink /></Button>
            <UploadPhotosForm event_id={event_id}/>
          </ButtonGroup>
        </CardFooter>
      </Card>
      </Center>

    </>
  );
}

export default EventById