import { Box, Text, useColorModeValue, Input, Button, Avatar, VStack, FormControl, FormLabel, HStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

const SettingsRoute = () => {
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base">
      <Text fontSize="2xl" color={textColor} mb={4}>Управление профилем пользователя</Text>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel color={textColor}>Аватар:</FormLabel>
          <HStack spacing={4}>
            <Box position="relative" onClick={triggerFileInput} cursor="pointer">
              <Avatar size="xl" src={avatar} />
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="rgba(0, 0, 0, 0.5)"
                opacity="0"
                _hover={{ opacity: 1 }}
                borderRadius="full"
              >
                <FaCamera color="white" size="1.5em" />
              </Box>
            </Box>
            <Input type="file" ref={fileInputRef} onChange={handleAvatarChange} placeholder="Выберите аватар" display="none" />
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel color={textColor}>Имя:</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите ваше имя" />
        </FormControl>
        <FormControl>
          <FormLabel color={textColor}>Email:</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите ваш email" />
        </FormControl>
        <Button mt={4} colorScheme="blue" onClick={handleUpdate}>Обновить</Button>
      </VStack>
    </Box>
  );
};

export default SettingsRoute;
