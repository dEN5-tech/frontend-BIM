import { Box, Button, FormControl, FormLabel, Input, useColorModeValue, Center, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../requests/axios';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../../store/userSlice';

const LoginRoute = () => {
  const formBg = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("orange", "brand.darkPeach");
  const buttonHoverBg = useColorModeValue("brand.peach", "orange.300");
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(fetchProfile() as any);
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: response.data.message || "No token received",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [email, password, navigate, dispatch, toast]);

  return (
    <Center h="100vh">
      <Box bg={formBg} p={8} borderRadius="lg" boxShadow="lg" w="400px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button mt={6} bg={buttonBg} color="white" _hover={{ bg: buttonHoverBg }} onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Center>
  );
};

export default LoginRoute;
