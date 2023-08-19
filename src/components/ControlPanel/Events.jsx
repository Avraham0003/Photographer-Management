import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EventsTable from './EventsTable';
import AddEventForm from '../AddEvent/AddEventForm';
import Cookies from "js-cookie";
import UserContext from '../../context/UserContext';

function Albums() {
    const [allEvents, setAllEvents] = useState(null);
    const [canUse, setCanUse] = useState(false);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        if (userID){

            axios.get(import.meta.env.VITE_SERVER_URL+`/events/all/${userID}`).then((res) => {
                setAllEvents(res.data.events);
            });
        }
    }, [userID]);

    useEffect(() => {
        if (allEvents !== null) {
            setCanUse(true);
        }
    }, [allEvents]);

    return (
        <>
            {userID && <AddEventForm user_id={userID}/>}
            {canUse && <EventsTable data={allEvents} />}
        </>
    );
}

export default Albums;
