import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Link,
  useDisclosure,
  DrawerCloseButton,
  Box,
  Button,
  Image,
  Flex,
  Text,
  Icon
} from '@chakra-ui/react'
import { HiMenuAlt3 as Menu, HiHome, HiOutlineAnnotation, HiOutlinePresentationChartBar, HiOutlineLogout,HiLogin, HiOutlineUserCircle } from "react-icons/hi";
import React, { useContext } from 'react'
import MainLogoPhoto from './MainLogo.png'
import UserContext from '../../context/UserContext';
function Header() {
  const { userData, logout, isLogged } = useContext(UserContext);
  const menu_button_style = {
    cursor: 'pointer',
    float: 'right',
    fontSize: '40px',
    color: 'black',
    transition: "all 0.2s",
    borderRadius: '10%',
    _hover:{
      background: "rgba(0,0,0,0.5)",
      color: "white",
      transition: "all 0.2s"
    }
  }
  const header_style = {
    boxShadow: '-1px 1px 10px 0px rgba(0,0,0,0.2)',
    py: 4,
    px: [5,100],
    position: 'sticky',// Can be remove
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box sx={header_style}>
        <Flex align="center" justify="space-between" >
          <Box onClick={onOpen} sx={menu_button_style} ><Menu /></Box>
          <Box>
            <Image src={MainLogoPhoto} alt="Logo" h={8} />
          </Box>
        </Flex>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent width={'50%'}>
          <DrawerHeader borderBottomWidth='1px' fontSize={'xl'} color={'black'} padding={5}>
            מערכת לצלם
          </DrawerHeader>
          <DrawerCloseButton fontSize={'xl'} color={'black'} marginY={3} />
          <DrawerBody>
            <Button width={'100%'} my={5}><HiHome />&nbsp;<Link fontSize={'xl'} display={'block'} my={'10'} dir='rtl' href='/'> דף הבית</Link></Button>
            
            {isLogged && <Button width={'100%'} my={5} colorScheme='blue'><HiOutlinePresentationChartBar />&nbsp;<Link fontSize={'xl'} display={'block'} my={'10'} dir='rtl' href='/controlpanel'> פאנל ניהול </Link></Button>}
            
            {!isLogged && <Button width={'100%'} my={5} colorScheme='green'><HiLogin />&nbsp;<Link fontSize={'xl'} display={'block'} my={'10'} dir='rtl' href='/login'> התחבר</Link></Button>}
            
            <Button width={'100%'} my={5} colorScheme='yellow'><HiOutlineAnnotation />&nbsp;<Link fontSize={'xl'} display={'block'} my={'10'} dir='rtl' href='/contactus'> צור קשר</Link></Button>
          </DrawerBody>
          {isLogged && 
          <Box padding={10}>
            <Box w={'100%'} px={10} textAlign={'center'} fontSize={'xl'}><Icon display={'inline'} as={HiOutlineUserCircle}/> {isLogged && userData.user_name}</Box>
            <Button onClick={()=> logout()} width={'100%'} my={5} colorScheme='red'><HiOutlineLogout />&nbsp;<Link fontSize={'xl'} display={'block'} my={'10'} dir='rtl'> התנתק</Link></Button>
          </Box>
          }
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
