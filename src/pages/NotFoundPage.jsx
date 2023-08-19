import { Heading,Center, Button, Box} from '@chakra-ui/react'
import { HiOutlineStatusOffline } from 'react-icons/hi'
function NotFoundPage() {
  return (
    <>
    <Center marginTop={'40vh'}>
      <Heading>הדף לא נמצא 404</Heading><HiOutlineStatusOffline fontSize={50} />
    </Center>
    <Center>
      <Button onClick={()=>{history.back()}}>חזור</Button>
    </Center>
    </>
  )
}

export default NotFoundPage