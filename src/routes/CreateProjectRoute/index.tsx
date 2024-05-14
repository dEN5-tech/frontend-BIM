
import { Box, Button, Container, Heading, Input, Text, Textarea, useColorModeValue, useToast } from "@chakra-ui/react";
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../requests/axios"; // Added axiosInstance import

const CreateProjectRoute = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState<string | undefined>("");
  const [projectBackgroundImage, setProjectBackgroundImage] = useState("");
  const [projectMiniDescription, setProjectMiniDescription] = useState("");
  const editorBgColor = useColorModeValue("brand.white", "brand.black");
  const editorTextColor = useColorModeValue("brand.black", "brand.white");
  const colorMode = useColorModeValue("light", "dark");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode);
  }, [colorMode]);

  const handleCreateProject = async () => {
    try {
      const response = await axiosInstance.post('/projects', {
        name: projectName,
        description: projectDescription,
        miniDescription: projectMiniDescription,
        backgroundImage: projectBackgroundImage,
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "2023-12-31T23:59:59.999Z"
      });
      toast({
        title: "Проект создан.",
        description: `ID проекта: ${response.data.id}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/projects/${response.data.id}`);
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
    }
  };
  
  return (
    <Container maxW="container.md" overflowY="auto" maxH="calc(100vh - 15px)">
      <Heading mb={4}>Создать проект</Heading>
      <Text mb={4}>Введите название проекта и описание</Text>
      <Input 
        placeholder="Название проекта" 
        value={projectName} 
        onChange={(e) => setProjectName(e.target.value)} 
        mb={4}
      />
      <Textarea 
        placeholder="Мини описание"
        maxLength={110}
        value={projectMiniDescription} 
        onChange={(e) => setProjectMiniDescription(e.target.value)} 
        mb={4}
      />
      <Input 
        placeholder="URL фона проекта" 
        value={projectBackgroundImage} 
        onChange={(e) => setProjectBackgroundImage(e.target.value)} 
        mb={4}
      />
      <Box className="editor-container" bg={editorBgColor} color={editorTextColor} mb={4}>
        <div className="wmde-markdown-var">
          <MDEditor
            value={projectDescription}
            onChange={(value) => setProjectDescription(value)}
            height={400}
          />
        </div>
      </Box>
      <Button onClick={handleCreateProject} colorScheme="teal">Создать проект</Button>
    </Container>
  );
};

export default CreateProjectRoute;