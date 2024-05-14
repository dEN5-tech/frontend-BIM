
import { Flex, HStack, VStack, Text, Avatar, useColorModeValue, Spinner } from '@chakra-ui/react';
import { User, DTOAxiosResponse, MessageDTO } from '../../types';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axiosInstance from '../../requests/axios';
import { useSelector } from 'react-redux';
import {RootState} from "../../store"
import ChatInput from '../ChatInput';

const ChatContainer = ({ selectedUser, onOpen }: { selectedUser: User | null, onOpen: () => void }) => {
    const bgChat = useColorModeValue("white", "gray.800");
    const bgChatSender = useColorModeValue("brand.skyBlue", "brand.darkSkyBlue");
    const bgChatReceiver = useColorModeValue("brand.mintGreen", "brand.darkMintGreen");

    const textColor = useColorModeValue("brand.black", "brand.darkBlack");

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
    }, [selectedUser, loggedInUser?.id]);

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
                await axiosInstance.post<DTOAxiosResponse>(`chats/messages`, {
                    senderId: loggedInUser?.id,
                    receiverId: selectedUser.id,
                    content: message
                });
                setMessage("");
                fetchMessages();
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    const messageList = useMemo(() => (
        messages.length > 0 ? (
            <VStack spacing={4} align="stretch">
                {messages.map((msg) => (
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
                ))}
            </VStack>
        ) : (
            <Text>No messages</Text>
        )
    ), [messages, loggedInUser, bgChatSender, bgChatReceiver, textColor]);

    return (
        <Flex flexDirection="column" flex="1" p={4} bg={bgChat}>
            {loading ? <Spinner alignSelf="center" mt={4} /> : (
                <VStack spacing={4} align="stretch" flex="1" overflowY="auto">
                    {messageList}
                    <div ref={messagesEndRef} />
                </VStack>
            )}
            <ChatInput
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                selectedUser={selectedUser as User}
                onOpen={onOpen}
            />
        </Flex>
    )
}

export default ChatContainer;

