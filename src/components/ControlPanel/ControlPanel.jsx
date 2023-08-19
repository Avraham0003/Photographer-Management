import { Heading } from "@chakra-ui/react";
import Events from '../ControlPanel/Events';
function ControlPanel() {
  return (
    <>
    <Heading dir="rtl" mx={10}>אירועים:</Heading>
    <Events/>
    </>
  )
}

export default ControlPanel