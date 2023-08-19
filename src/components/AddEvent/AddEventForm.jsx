
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
    Select,
    Tooltip
} from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios';
import { HiPlus } from 'react-icons/hi';

function AddEventForm(user_id) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formData, setFormData] = useState({
        event_name: '',
        event_date: '',
        event_type: 'חתונה',
        event_owner: '',
        event_hall: '',
        event_photographers: '',
        user_id: user_id.user_id
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        axios.post(import.meta.env.VITE_SERVER_URL+'/events/create', formData)
        .then((response) => {
            console.log(response.data);
            // handle success
            location.reload();
        })
        .catch((error) => {
            console.log(error);
            // handle error
        });
        
    }
            
        return (
            <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'} fontSize={25}>הוספת אירוע</ModalHeader>
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

                                <Button type='submit' marginY={10}>צור אירוע חדש &nbsp;<HiPlus /></Button>

                            </form>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Tooltip label='הוסף אירוע' bg='grey.20' color='black'>
                <Button onClick={onOpen} colorScheme="blue" mr={50}>הוסף אירוע&nbsp;<HiPlus /></Button>
            </Tooltip>
        </>
    )
}

export default AddEventForm