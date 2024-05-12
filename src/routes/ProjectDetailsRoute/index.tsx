import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Flex, Text, Textarea, useColorModeValue, VStack, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdInsertDriveFile } from 'react-icons/md';
import theme from '../../theme';

const ProjectDetailsRoute = () => {
  const { projectId } = useParams();
  const textColor = useColorModeValue(theme.colors.brand.softBlack, theme.colors.brand.softGray);
  const backgroundColor = useColorModeValue(theme.colors.brand.softBlue, theme.colors.brand.deepBlue);
  const detailTextColor = useColorModeValue(theme.colors.brand.softBlack, theme.colors.brand.softGray);
  const descriptionColor = useColorModeValue(theme.colors.brand.paleLavender, theme.colors.brand.richLavender);
  const buttonColorScheme = useColorModeValue(theme.colors.brand.paleLavender, theme.colors.brand.richLavender);
  const inputBackgroundColor = useColorModeValue("white", "gray.700");

  return (
    <Box p={4} color={textColor} maxW="1200px" mx="auto">
      <Text fontSize="3xl" mb={4} fontWeight="bold">Проект {projectId}</Text>
      <Flex direction="column" align="center" p={4} bg={backgroundColor} borderRadius="lg" shadow="md">
        <Text fontSize="xl" color={detailTextColor} mb={2} fontWeight="semibold">
          Детали проекта:
        </Text>
        <Text color={descriptionColor} mb={4}>
          Полное описание проекта, включая все изображения и документы.
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={MdInsertDriveFile} color="green.500" />
            обзор_проекта.pdf
          </ListItem>
          <ListItem>
            <ListIcon as={MdInsertDriveFile} color="green.500" />
            чертеж.png
          </ListItem>
          <ListItem>
            <ListIcon as={MdInsertDriveFile} color="green.500" />
            требования.docx
          </ListItem>
        </List>
        <Button colorScheme={buttonColorScheme} size="lg">Загрузить документы</Button>
        <Textarea placeholder="Добавьте комментарий..." bg={inputBackgroundColor} mt={4} size="lg" />
        <VStack spacing={3} align="stretch" mt={4} overflowY="auto" maxHeight="400px">
          <Flex align="center">
            <Text color={detailTextColor} fontWeight="medium">Комментарии:</Text>
          </Flex>
          <Box p={4} bg={inputBackgroundColor} borderRadius="md">
            <Flex align="center">
              <Avatar size="sm" name="User 2" src="path_to_user2_image.jpg" mr={2} />
              <Text color={textColor}>Отличный проект!</Text>
            </Flex>
          </Box>
          <Box p={4} bg={inputBackgroundColor} borderRadius="md">
            <Flex align="center">
              <Avatar size="sm" name="User 3" src="path_to_user3_image.jpg" mr={2} />
              <Text color={textColor}>Нужно больше информации о бюджете.</Text>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ProjectDetailsRoute;
