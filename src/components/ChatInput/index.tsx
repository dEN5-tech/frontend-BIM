import { HStack, IconButton, Input, Button, useColorModeValue } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { User } from "../../types";
import { memo } from "react";



const ChatInput = memo(({ message, setMessage, sendMessage, selectedUser, onOpen }: { message: string, setMessage: (value: string) => void, sendMessage: () => void, selectedUser: User, onOpen: () => void }) => {
    const bgInput = useColorModeValue("brand.mintGreen", "brand.darkMintGreen");
    const bgSidebar = useColorModeValue("brand.lavender", "brand.darkLavender");

    return (
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
                Отправить
            </Button>
        </HStack>
    )
})

export default ChatInput;


