import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EventsTable from './EventsTable';
import AddEventForm from '../AddEvent/AddEventForm';
import Cookies from "js-cookie";
import UserContext from '../../context/UserContext';
import { Center, Spinner } from '@chakra-ui/react';

function Albums() {
    const [canUse, setCanUse] = useState(false);
    const { userID } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allEvents, setAllEvents] = useState(null);

    useEffect(() => {
        if (userID) {

            const getAllEvents = async () => {
                try {
                    setLoading(true);

                    const { data } = await axios.get(import.meta.env.VITE_SERVER_URL + `/events/all/${userID}`);

                    setAllEvents(data.events);
                } catch (error) {
                    setError(error.response.data.error)
                } finally {
                    setLoading(false);
                }
            }

            getAllEvents();
        }
    }, [userID]);

    useEffect(() => {
        if (allEvents !== null) {
            setCanUse(true);
        }
    }, [allEvents]);

    return (
        <>
            {loading ? <Center><Spinner
                display={'block'}
                my={200}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            /></Center> : null}
            {error ? <Center>{error}</Center> : null}
            {allEvents && <AddEventForm user_id={userID} />}
            {canUse && <EventsTable data={allEvents} />}
        </>
    );
}

export default Albums;
