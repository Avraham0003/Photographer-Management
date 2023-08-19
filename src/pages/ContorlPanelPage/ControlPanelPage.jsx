import { Divider, Heading } from "@chakra-ui/react";
import Header from "../../components/Header/Header.jsx";
import Events from "../../components/ControlPanel/Events.jsx";
function ControlPanelPage() {

    
  return (
    <>
    <Header/>
    <Heading textAlign={'center'} margin={5}>פאנל ניהול</Heading>
    <Divider />
    <Heading dir="rtl" mx={10}>אירועים:</Heading>
    <Events/>
    </>
  )
  
}

export default ControlPanelPage