import React from "react";
import { HStack, Avatar, Text, useColorModeValue } from "@chakra-ui/react";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type ListUserItemProps = {
  user: User;
  selectedUser: User | undefined;
  setSelectedUser: (user: User) => void;
};

const ListUserItem: React.FC<ListUserItemProps> = React.memo(
  ({ user, selectedUser, setSelectedUser }) => {
    const isSelected = selectedUser ? selectedUser.id === user.id : false;
    // Utilizing theme colors for better theme consistency
    const backgroundColor = useColorModeValue(
      isSelected ? "brand.darkSkyBlue" : "brand.skyBlue", 
      isSelected ? "brand.darkBlack" : "brand.darkSkyBlue"
    );
    const textColor = useColorModeValue(
      isSelected ? "brand.white" : "brand.black", 
      isSelected ? "brand.darkWhite" : "brand.darkBlack"
    );

    return (
      <HStack
        key={user.id}
        spacing={4}
        p={2}
        onClick={() => setSelectedUser(user)}
        cursor="pointer"
        rounded="md"
        bg={backgroundColor}
      >
        <Avatar src={user.avatar} />
        <Text
          fontWeight={isSelected ? "bold" : "normal"}
          color={textColor}
        >
          {user.name}
        </Text>
      </HStack>
    );
  },
);

export default ListUserItem;