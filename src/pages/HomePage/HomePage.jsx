import React from 'react';
import Header from '../../components/Header/Header';
import HomePagephoto from './HomePagePhotos/backgroundimage.jpg';
import { Button, Heading, Center, Link, Box, CardBody, CardHeader, Card, Text, UnorderedList, ListItem,Divider } from '@chakra-ui/react';
import { HiLogin, HiOutlinePresentationChartBar, HiOutlineAnnotation, HiOutlineCheckCircle } from "react-icons/hi";
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import Footer from '../../components/Footer/Footer';
const card_style = {
    width: '25%',
    margin: '10px',
    textAlign: 'center',
}
function HomePage() {
    const { isLogged } = useContext(UserContext);


    return (
        <>
            <div style={{
                backgroundImage: `url(${HomePagephoto})`,
                height: '75vh',
                backgroundSize: 'cover',
            }}>

                <Header />
                <Box bg={'rgba(255,255,255,0)'} padding={1}>
                    <Heading textAlign={'Center'} marginTop={'10vh'} color={'black'}>מערכת ניהול אלבומים לצלם</Heading>

                    <Center my={10}>
                        {isLogged ? (
                            <Button mx={2} colorScheme='blue'><Link href='/controlpanel'>פאנל ניהול</Link>&nbsp;<HiOutlinePresentationChartBar /></Button>
                        ) : (
                            <Button mx={2} colorScheme='green'><Link href='/login'>התחבר</Link>&nbsp;<HiLogin /></Button>
                        )}
                        <Button mx={2} colorScheme='yellow'><Link href='/contactus'>צור קשר</Link>&nbsp;<HiOutlineAnnotation /></Button>
                    </Center>
                </Box>
            </div>

            <Heading my={10} textAlign={'center'}>החבילות שלנו:</Heading>
            <Center my={10}>
                <Card sx={card_style}>
                    <CardHeader>
                        <Heading size='md'>חבילת BASIC</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text textAlign={"center"} bg={'black'} bgGradient='linear(to-l, #4760ff, #0dccff)'
                            bgClip='text'
                            fontSize='5xl'
                            fontWeight='bold'>100$/m</Text>
                    <Divider my={10}/>
                        <UnorderedList>
                            <ListItem>עד 500GB אחסון</ListItem>
                            <ListItem>עד 10 אלבומים</ListItem>
                            <ListItem>עד 1000 תמונות לאלבום</ListItem>
                        </UnorderedList>
                        <Button my={10} colorScheme='purple'>לפרטים נוספים</Button>
                    </CardBody>
                </Card>

                <Card sx={card_style}>
                    <CardHeader>
                        <Heading size='md'>חבילת PRO</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text textAlign={"center"} bg={'black'} bgGradient='linear(to-l, #4760ff, #0dccff)'
                            bgClip='text'
                            fontSize='5xl'
                            fontWeight='bold'>150$/m</Text>
                        <Divider my={10}/>
                        <UnorderedList>
                            <ListItem>עד 2TB אחסון</ListItem>
                            <ListItem>עד 20 אלבומים</ListItem>
                            <ListItem>עד 2000 תמונות לאלבום</ListItem>
                           <ListItem>גיבוי קבצים אוטומטי</ListItem>
                        </UnorderedList>
                        <Button my={10} colorScheme='purple'>לפרטים נוספים</Button>
                    </CardBody>
                </Card>

                <Card sx={card_style}>
                    <CardHeader>
                        <Heading size='md'>חבילת PRO MAX</Heading>
                    </CardHeader>

                    <CardBody>
                        <Text textAlign={"center"} bg={'black'} bgGradient='linear(to-l, #4760ff, #0dccff)'
                            bgClip='text'
                            fontSize='5xl'
                            fontWeight='bold'>200$/m</Text>
                            <Divider my={10}/>
                        <UnorderedList>
                            <ListItem>עד 4TB אחסון</ListItem>
                            <ListItem> אלבומים ללא הגבלה</ListItem>
                            <ListItem>עד 5000 תמונות לאלבום</ListItem>
                           <ListItem>גיבוי קבצים אוטומטי</ListItem>
                        </UnorderedList>
                        <Button my={10} colorScheme='purple'>לפרטים נוספים</Button>
                    </CardBody>
                </Card>

            </Center>
            <Footer/>

        </>
    )
}

export default HomePage