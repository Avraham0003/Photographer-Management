import React, { useState, useContext } from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, Button, Center } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import { HiLogin } from 'react-icons/hi';
function LoginForm() {
  const { userData, login, isLogged } = useContext(UserContext);
  if(isLogged) {
    return <Navigate to={"/controlpanel"} />
  }
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: ""

});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
          login(formData.user_email, formData.user_password);
        }catch{
              (error) => {
                toast.error(error.message);
            }
          };

    }
  return (
    <>
      <Center my={10}>
        <form onSubmit={handleSubmit} dir='rtl'>

          <FormControl isRequired dir='rtl'>
            <FormLabel>מייל:</FormLabel>
            <Input
              onChange={handleChange}
              name='user_email'
              placeholder='מייל'
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>סיסמה:</FormLabel>
            <InputGroup size='md'>
              <Input
                onChange={handleChange}
                name='user_password'
                paddingLeft='4.5rem'
                paddingRight='1rem'
                type={show ? 'text' : 'password'}
                placeholder='הכנס סיסמה'
              />
              <InputLeftElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'הסתר' : 'הצג'}
                </Button>
              </InputLeftElement>
            </InputGroup>
            <Button type='submit' marginY={10} colorScheme='green'>התחבר&nbsp;<HiLogin /></Button>
          </FormControl>
        </form>
      </Center>
    </>
  );
}

export default LoginForm;
