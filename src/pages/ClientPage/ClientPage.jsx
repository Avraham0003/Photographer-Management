import HeaderWithoutDrawer from '../../components/Header/HeaderWithoutDrawer';
import { Button, Heading, Center, Link, Box, CardBody, CardHeader, Card, Text, UnorderedList, ListItem, Divider, Spinner } from '@chakra-ui/react';
import Footer from '../../components/Footer/Footer'
import Gallery from '../../components/Gallery/Gallery';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function ClientPage() {
    const [loading, setLoading] = useState(true);
    const [eventData, setEventData] = useState(null);
    const [eventPhotos, setEventPhotos] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);

    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const { event_id } = useParams();


    useEffect(() => {
        getEventDetails(event_id)
            .then(event => {
                setEventData(event);
            })
            .catch(error => {
                toast.error(error);
            });
        getEventPhotos(event_id)
            .then((photos) => {
                setEventPhotos(photos);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    }, [event_id]);

    useEffect(() => {
        setAllPhotos([]);
        setSelectedPhotos([]);
        eventPhotos.map((photo) => {
            setAllPhotos(allPhotos => [...allPhotos, { name: photo._id, src: import.meta.env.VITE_SERVER_URL + '/' + photo.photo_link, is_selected: photo.is_selected, disabled: photo.disabled }]);
            if (photo.is_selected) {
                setSelectedPhotos(selectedPhotos => [...selectedPhotos, { name: photo._id, src: import.meta.env.VITE_SERVER_URL + '/' + photo.photo_link, is_selected: photo.is_selected, disabled: photo.disabled }]);
            }
        });
    }, [eventPhotos]);

    async function getEventDetails(event_id) {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL + `/events/get_by_id/${event_id}`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving event details:', error);
            throw error;
        }
    }

    async function getEventPhotos(event_id) {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL + `/photos/get_photos_by_event_id/${event_id}`);
            return response.data.photos;
        } catch (error) {
            console.error('Error retrieving event details:', error);
            throw error;
        }
    }

    const downloadImage = (image) => {
        saveAs(image, image) // Put your image url here.
    }

    return (
        <>


            <HeaderWithoutDrawer />
            {loading && <Center><Spinner
                my={200}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            /></Center>}
            {!loading && <><Heading my={10} textAlign={'center'}>{eventData && eventData.event_name}</Heading> <Gallery images={allPhotos} /></>}
            <Footer />

        </>
    )
}

export default ClientPage