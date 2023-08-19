import { Divider, Heading } from "@chakra-ui/react";
import Header from "../components/Header/Header.jsx";
import ControlPanel from "../components/controlpanel/ControlPanel.jsx";

function ControlPanelPage() {

    
  return (
    <>
    <Header/>
    <Heading textAlign={'center'} margin={5}>פאנל ניהול</Heading>
    <Divider />
    <ControlPanel/>
    </>
  )
  
}

export default ControlPanelPage