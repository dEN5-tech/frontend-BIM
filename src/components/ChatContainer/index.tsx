import { AttachmentIcon } from '@chakra-ui/icons';
import { Flex, HStack, VStack, Text, Avatar, IconButton, Input, Button, useColorModeValue, Spinner } from '@chakra-ui/react';
import { User, DTOAxiosResponse, MessageDTO } from '../../types';
import { useEffect, useState, useRef, useCallback } from 'react';
import axiosInstance from '../../requests/axios';
import { useSelector } from 'react-redux';
import {RootState} from "../../store"

const ChatContainer = ({ selectedUser, onOpen }: { selectedUser: User | null, onOpen: () => void }) => {
    const bgChat = useColorModeValue("white", "gray.800");
    const bgChatSender = useColorModeValue("brand.skyBlue", "brand.darkSkyBlue");
    const bgChatReceiver = useColorModeValue("brand.mintGreen", "brand.darkMintGreen");

    const bgInput = useColorModeValue("brand.mintGreen", "brand.darkMintGreen");
    const textColor = useColorModeValue("brand.black", "brand.darkBlack");
    const bgSidebar = useColorModeValue("brand.lavender", "brand.darkLavender");

    const loggedInUser = useSelector((state: RootState) => state.user.loggedInUser);

    const [messages, setMessages] = useState<MessageDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [message, setMessage] = useState<string>("");

    const fetchMessages = useCallback(async () => {
        if (!selectedUser) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get<DTOAxiosResponse>(`/chats/${loggedInUser?.id}/${selectedUser.id}`);
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    }, [selectedUser]);

    useEffect(() => {
        if (selectedUser?.id) {
            fetchMessages();
        }
    }, [selectedUser?.id, fetchMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (message.trim() && selectedUser) {
            try {
                const response = await axiosInstance.post<DTOAxiosResponse>(`chats/messages`, {
                    userId: loggedInUser?.id, // Using loggedInUser's ID
                    receiverId: selectedUser.id,
                    content: message
                });
                if (response.data.messages && response.data.messages.length > 0) {
                    setMessages(prevMessages => [...prevMessages, response.data.messages[response.data.messages.length - 1]]);
                }
                setMessage("");
                fetchMessages();
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    return (
        <Flex flexDirection="column" flex="1" p={4} bg={bgChat}>
            {loading ? <Spinner alignSelf="center" mt={4} /> : (
                <VStack spacing={4} align="stretch" flex="1" overflowY="auto">
                    {messages && messages.length > 0 ? messages.map((msg) => (
                        <HStack
                            key={msg.id.toString()}
                            bg={msg.user.id === loggedInUser?.id ? bgChatSender : bgChatReceiver}
                            rounded="lg"
                            p={4}
                            spacing={4}
                            align="start"
                            className="message-bubble"
                            justifyContent={"flex-start"}
                        >
                            <Avatar src={msg.user.avatar} />
                            <VStack align="start">
                                <Text fontWeight="bold" color={textColor}>
                                    {msg.user.name}
                                </Text>
                                <Text color={textColor}>{msg.content}</Text>
                            </VStack>
                        </HStack>
                    )) : <Text>No messages</Text>}
                    <div ref={messagesEndRef} />
                </VStack>
            )}

            <HStack p={4} bg={bgSidebar}>
                <IconButton
                    icon={<AttachmentIcon />}
                    onClick={onOpen}
                    isRound={true}
                    bg={bgInput}
                    aria-label="Attach file"
                />
                <Input value={message} onChange={({ target }) => setMessage(target.value)} placeholder="Type your message here..." />
                <Button onClick={sendMessage} colorScheme="blue" isDisabled={!message.trim() || !selectedUser}>
                    Send
                </Button>
            </HStack>
        </Flex>
    )
}

export default ChatContainer;

