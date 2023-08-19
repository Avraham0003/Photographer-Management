import {
    FormControl,
    FormLabel,
    Input,
    Center,
    Divider,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Select
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { HiOutlinePencil, HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

function EditEvent(props) {
    const {eventData, date} = props;
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formData, setFormData] = useState({
        event_name:'',
        event_date: '',
        event_type: '',
        event_owner: '',
        event_hall: '',
        event_photographers: ''

    });
    useEffect(() => {
        if(eventData != null){
             setFormData({
               event_name: eventData.event_name,
               event_date: date,
               event_type: eventData.event_type,
               event_owner: eventData.event_owner,
               event_hall: eventData.event_hall,
               event_photographers: eventData.event_photographers
           }); 
        }
    },[eventData, date]);
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
    
            axios.put(import.meta.env.VITE_SERVER_URL+`/events/update/${eventData._id}`, formData) // fix bug
                .then((response) => {
                    console.log(response);
                    // handle success
                    onClose();
                    props.setEventData({...formData, _id:eventData._id});
                    toast.success('האירוע עודכן בהצלחה');

                })
                .catch((error) => {
                    console.log(error);
                    // handle error
                    toast.error('שגיאה');
                });
    
        }


  return (
 <>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader textAlign={'center'} fontSize={25}>עריכת אירוע</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Center>
                <form onSubmit={handleSubmit} dir='rtl'>
                    <FormControl isRequired >
                        <FormLabel>שם האירוע:</FormLabel>
                        <Input value={formData.event_name}
                            onChange={handleChange}
                            name='event_name'
                            placeholder='שם האירוע' />
                    </FormControl>

                    <Divider margin={5} />

                    <FormControl isRequired>
                        <FormLabel>תאריך האירוע:</FormLabel>
                        <Input value={formData.event_date}
                            onChange={handleChange}
                            name='event_date'
                            type='Date' />
                    </FormControl>

                    <Divider margin={5} />

                    <FormControl isRequired>
                        <FormLabel>סוג האירוע:</FormLabel>
                        <Select value={formData.event_type}
                            onChange={handleChange}
                            name='event_type'
                            p={2}>
                            <option value="חתונה">חתונה</option>
                            <option value="חינה">חינה</option>
                            <option value="בר מצווה">בר מצווה</option>
                            <option value="עלייה לתורה">עלייה לתורה</option>
                            <option value="בת מצווה">בת מצווה</option>
                            <option value="ברית מילה">ברית מילה</option>
                            <option value="בריתה">בריתה</option>
                            <option value="יום הולדת ">יום הולדת</option>
                        </Select>
                    </FormControl>

                    <Divider margin={5} />

                    <FormControl isRequired>
                        <FormLabel>בעל האירוע:</FormLabel>
                        <Input value={formData.event_owner}
                            onChange={handleChange}
                            name='event_owner'
                            placeholder='בעל האירוע' />
                    </FormControl>

                    <Divider margin={5} />

                    <FormControl isRequired>
                        <FormLabel>אולם:</FormLabel>
                        <Input value={formData.event_hall}
                            onChange={handleChange}
                            name='event_hall'
                            placeholder='מיקום האירוע' />
                    </FormControl>

                    <Divider margin={5} />

                    <FormControl >
                        <FormLabel>צלמים:</FormLabel>
                        <Input value={formData.event_photographers}
                            onChange={handleChange}
                            name='event_photographers'
                            placeholder='צלמים' />
                    </FormControl>

                    <Button type='submit' colorScheme="yellow" marginY={10}>עדכן אירוע   &nbsp;<HiCheck /></Button>

                </form>
            </Center>
        </ModalBody>
    </ModalContent>
</Modal>
<Button onClick={onOpen} colorScheme="yellow" mr={50}>ערוך אירוע &nbsp;<HiOutlinePencil /></Button>
</>
  )
}

export default EditEvent