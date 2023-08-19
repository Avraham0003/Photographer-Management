import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Image
} from '@chakra-ui/react';

import React from 'react'
import MainLogoPhoto from '../../components/Header/MainLogo.png';

function Footer() {
    return (
        <>
            <Box
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 כל הזכויות שמורות</Text>
                    <Image src={MainLogoPhoto} alt="Logo" h={8} />
                </Container>
            </Box>
        </>
    );
};

export default Footer