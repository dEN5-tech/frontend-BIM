import { Box, Text, Button, VStack, HStack, useColorModeValue, Avatar, Badge, Input, Select, Icon, AvatarGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Tooltip, Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import axiosInstance from '../../requests/axios';
import { Event } from '../../types';

const EventsRoute = () => {
  const bg = useColorModeValue("brand.lavender", "brand.black");
  const buttonBg = useColorModeValue("brand.skyBlue", "brand.mintGreen");
  const textColor = useColorModeValue("brand.black", "brand.darkBlack");
  const borderColor = useColorModeValue("brand.peach", "brand.darkPeach");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<{ name: string; avatar: string }[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axiosInstance.get<Event[]>('/events')
    .then((res) => {
      setEvents(res.data)
    })
    .catch((error) => {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    });
  }, [])

  const handleAvatarGroupClick = useCallback((participants: { name: string; avatar: string }[]) => {
    setSelectedEventParticipants(participants);
    onOpen();
  }, [onOpen]);

  const summing = useMemo(() => {
    return (searchInputRef.current?.clientHeight || 0) + (filterSelectRef.current?.clientHeight || 0);
  }, []);

  return (
    <Box p={4} color={textColor}>
      <Text fontSize="2xl" mb={4}>Все События</Text>
      <Select ref={filterSelectRef} placeholder="Фильтр по типу" mb={4} icon={<FaUserFriends />}>
        <option value="conference">Конференции</option>
        <option value="seminar">Семинары</option>
        <option value="workshop">Мастер-классы</option>
      </Select>
      <Input ref={searchInputRef} placeholder="Поиск событий" mb={4} />
      <VStack spacing={4} overflowY="auto" maxH={{ base: `calc(100vh - ${summing+120}px)` }}>
        {events && events.map((event) => (
        <Box key={event.title} p={4} bg={bg} borderRadius="lg" borderWidth="1px" borderColor={borderColor} w={{ base: "100%", sm: "100%", md: "100%", xl: "100%" }}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize={{ base: "md", sm: "md", md: "lg", xl: "xl" }}>{event.title}</Text>
            <Icon as={FaCalendarAlt} />
          </HStack>
          <Text fontSize={{ base: "xs", sm: "xs", md: "sm", xl: "md" }}>{event.date}</Text>
          <HStack spacing={2}>
            <Badge colorScheme="green" mr={2}>Предстоящее</Badge>
            <Badge colorScheme="blue">Популярное</Badge>
          </HStack>
          <Text mt={2} fontSize={{ base: "sm", sm: "sm", md: "md", xl: "lg" }}>{event.description}</Text>
          <HStack spacing={2} mt={2}>
            <Button bg={buttonBg} size={{ base: "xs", sm: "sm", md: "md", xl: "lg" }}>Буду участвовать</Button>
            <Button bg={buttonBg} size={{ base: "xs", sm: "sm", md: "md", xl: "lg" }}>Возможно</Button>
            <Button bg={buttonBg} size={{ base: "xs", sm: "sm", md: "md", xl: "lg" }}>Не буду участвовать</Button>
          </HStack>
          <Text mt={4} fontSize={{ base: "md", sm: "md", md: "lg", xl: "xl" }}>Участники:</Text>
          <AvatarGroup size={{ base: 'sm', sm: 'md', md: 'md', xl: 'md' }} max={2} onClick={() => handleAvatarGroupClick(event.participants)} _hover={{ animation: "buttonHoverAnimation 0.2s forwards" }}>
            {event.participants && event.participants.map((participant) => (
              <Tooltip label={participant.name} aria-label={participant.name} key={participant.name}>
                <Avatar  name={participant.name} src={participant.avatar} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Участники события</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={4}>
              {selectedEventParticipants.map((participant) => (
                <Tooltip label={participant.name} aria-label={participant.name} key={participant.name}>
                  <Avatar name={participant.name} src={participant.avatar} />
                </Tooltip>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventsRoute;