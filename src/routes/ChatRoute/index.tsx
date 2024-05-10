import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    Input,
    Button,
    VStack,
    HStack,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Textarea,
    useDisclosure,
    useColorModeValue
} from "@chakra-ui/react";
import SearchInput from '../../components/SearchInput';
import ListUserItem from '../../components/ListUserItem';
import FileUploadBox from '../../components/FileUploadBox';
import { AttachmentIcon } from '@chakra-ui/icons';
import axiosInstance from '../../requests/axios';
import { Message, User } from '../../types';
import ChatContainer from '../../components/ChatContainer';

const ChatRoute = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputGroupRef = useRef<HTMLDivElement>(null);
    const [inputHeight, setInputHeight] = useState<number>(0);

    const handleSearchChange = useCallback((searchTerm: string) => {
        if (searchTerm) {
            const filtered = users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredUsers(filtered);
            if (filtered.length === 0) {
                axiosInstance.get(`/user/search?nameIncludes=${encodeURIComponent(searchTerm)}`)
                    .then((response) => {
                        setUsers(prevUsers => [...prevUsers, ...response.data]);
                        setFilteredUsers(response.data);
                    });
            }
        } else {
            setFilteredUsers(users);
        }
    }, [users]);

    useEffect(() => {
        axiosInstance.get('/user/search?nameIncludes=')
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            });

        if (inputGroupRef.current) {
            setInputHeight(inputGroupRef.current.clientHeight + 35);
        }
    }, []);

    const bgSidebar = useColorModeValue("lavender", "darkLavender");

    return (
        <>
            <Flex h="100vh">
                <Box w="300px" bg={bgSidebar} p={4}>
                    <SearchInput
                        inputGroupRef={inputGroupRef}
                        onChange={handleSearchChange}
                    />
                    <VStack
                        align="stretch"
                        spacing={4}
                        overflowY="auto"
                        maxHeight={`calc(100vh - ${inputHeight}px)`}
                    >
                        {filteredUsers.map((user) => (
                            <ListUserItem
                                key={user.id.toString()}
                                setSelectedUser={setSelectedUser}
                                selectedUser={selectedUser}
                                user={user}
                            />
                        ))}
                    </VStack>
                </Box>

                <ChatContainer
                selectedUser={selectedUser}
                onOpen={onOpen}
                 />
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add files</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Upload image or document</FormLabel>
                            <FileUploadBox />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Add a comment to the file</FormLabel>
                            <Textarea placeholder="Enter comment here..." />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green">Send</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChatRoute;
