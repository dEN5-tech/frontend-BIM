import { Box, Button, Heading, Input, Text, Textarea } from "@chakra-ui/react";

const CreateProjectRoute = () => {
  return (
    <Box>
      <Heading>Создать проект</Heading>
      <Text>Введите название проекта и описание</Text>
      <Input placeholder="Название проекта" />
      <Textarea placeholder="Описание проекта" />
      <Button>Создать проект</Button>
    </Box>
  );
};



export default CreateProjectRoute;