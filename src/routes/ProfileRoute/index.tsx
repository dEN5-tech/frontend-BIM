import { Box, Grid, GridItem, Text, useColorModeValue, VStack, HStack, Avatar, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProfileRoute = () => {
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} maxH="100vh" p={5} overflowY="auto">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={4} bg={cardBgColor} p={5} borderRadius="md" boxShadow="base">
          <HStack spacing={4}>
            <Avatar name={user?.name || 'Эмма Ричардсон'} />
            <VStack align="start">
              <Text fontSize="2xl" color={textColor}>{user?.name || 'Эмма Ричардсон'}</Text>
              <Text color={textColor}>{user?.email || 'emma.rich@hotmail.com'}</Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem colSpan={2} bg={cardBgColor} p={5} borderRadius="md" boxShadow="base">
          <Text fontSize="xl" color={textColor} mb={2}>Информация о профиле</Text>
          <VStack align="start">
            <Text color={textColor}>Привет, я {user?.name || 'Кевин Карлссон'}. Природа дала нам все необходимые элементы для достижения исключительного благополучия и здоровья.</Text>
            <Text color={textColor}>Полное имя: {user?.name || 'Кевин Карлссон'}</Text>
            <Text color={textColor}>Электронная почта: {user?.email || 'carlsson.kev@gmail.com'}</Text>
            <HStack spacing={4}>
              <Button colorScheme="facebook">Facebook</Button>
              <Button colorScheme="twitter">Twitter</Button>
              <Button colorScheme="linkedin">LinkedIn</Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={4} bg={cardBgColor} p={5} borderRadius="md" boxShadow="base">
          <Text fontSize="xl" color={textColor} mb={2}>Проекты</Text>
          <VStack align="start">
            <Box bg={bgColor} p={4} borderRadius="md" boxShadow="base" w="full">
              <Text fontSize="lg" color={textColor}>UX Дизайн</Text>
              <Text color={textColor}>Очень важное примечание: нам нужно завершить низкоуровневые каркасы до конца этой недели.</Text>
            </Box>
            <Box bg={bgColor} p={4} borderRadius="md" boxShadow="base" w="full">
              <Text fontSize="lg" color={textColor}>UI Дизайн</Text>
              <Text color={textColor}>Цветовая палитра находится в системе дизайна. Компоненты также должны быть на месте.</Text>
            </Box>
            <Box bg={bgColor} p={4} borderRadius="md" boxShadow="base" w="full">
              <Text fontSize="lg" color={textColor}>Разработка</Text>
              <Text color={textColor}>Технические характеристики для этого проекта должны быть завершены до пятницы этого месяца. Высота строки просто идеальна.</Text>
            </Box>
            <Button colorScheme="teal" size="md">Создать новый проект</Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfileRoute;