import { Box, Text, Button, VStack, HStack, useColorModeValue, Avatar, Badge, Input, Select, Icon, AvatarGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Tooltip, Flex } from '@chakra-ui/react';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const EventsRoute = () => {
  const bg = useColorModeValue("brand.lavender", "brand.black");
  const buttonBg = useColorModeValue("brand.skyBlue", "brand.mintGreen");
  const textColor = useColorModeValue("brand.black", "brand.darkBlack");
  const borderColor = useColorModeValue("brand.peach", "brand.darkPeach");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} color={textColor}>
      <Text fontSize="2xl" mb={4}>Все События</Text>
      <Select placeholder="Фильтр по типу" mb={4} icon={<FaUserFriends />}>
        <option value="conference">Конференции</option>
        <option value="seminar">Семинары</option>
        <option value="workshop">Мастер-классы</option>
      </Select>
      <Input placeholder="Поиск событий" mb={4} />
      <VStack spacing={4}>
        <Box p={4} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Техническая Конференция 2023</Text>
            <Icon as={FaCalendarAlt} />
          </HStack>
          <Text fontSize="sm">15 марта 2023 г., 10:00</Text>
          <HStack spacing={2}>
            <Badge colorScheme="green" mr={2}>Предстоящее</Badge>
            <Badge colorScheme="blue">Популярное</Badge>
          </HStack>
          <Text mt={2}>Подробное описание события, включая время, место проведения и организаторов.</Text>
          <HStack spacing={2} mt={2}>
            <Button bg={buttonBg} size="sm">Буду участвовать</Button>
            <Button bg={buttonBg} size="sm">Возможно</Button>
            <Button bg={buttonBg} size="sm">Не буду участвовать</Button>
          </HStack>
          <Text mt={4} fontSize="lg">Участники:</Text>
          <AvatarGroup size='md' max={2} onClick={onOpen} _hover={{ animation: "buttonHoverAnimation 0.2s forwards" }}>
            <Avatar name='Райан Флоренс' src='https://bit.ly/ryan-florence' />
            <Avatar name='Сегун Адебайо' src='https://bit.ly/sage-adebayo' />
            <Avatar name='Кент Доддс' src='https://bit.ly/kent-c-dodds' />
            <Avatar name='Процветающий Отемуйива' src='https://bit.ly/prosper-baba' />
            <Avatar name='Кристиан Нвамба' src='https://bit.ly/code-beast' />
          </AvatarGroup>
        </Box>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Участники события</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex
            gap={4}
            >
            <Tooltip label="Райан Флоренс" aria-label="Райан Флоренс">
              <Avatar name='Райан Флоренс' src='https://bit.ly/ryan-florence' />
            </Tooltip>
            <Tooltip label="Сегун Адебайо" aria-label="Сегун Адебайо">
              <Avatar name='Сегун Адебайо' src='https://bit.ly/sage-adebayo' />
            </Tooltip>
            <Tooltip label="Кент Доддс" aria-label="Кент Доддс">
              <Avatar name='Кент Доддс' src='https://bit.ly/kent-c-dodds' />
            </Tooltip>
            <Tooltip label="Процветающий Отемуйива" aria-label="Процветающий Отемуйива">
              <Avatar name='Процветающий Отемуйива' src='https://bit.ly/prosper-baba' />
            </Tooltip>
            <Tooltip label="Кристиан Нвамба" aria-label="Кристиан Нвамба">
              <Avatar name='Кристиан Нвамба' src='https://bit.ly/code-beast' />
            </Tooltip>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventsRoute;