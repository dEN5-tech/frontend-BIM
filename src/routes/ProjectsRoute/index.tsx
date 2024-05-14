import { Box, SimpleGrid, Text, useColorModeValue, Flex, Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme'; // Import custom theme
import ProjectItem from '../../components/ProjectItem';

const ProjectsRoute = () => {
   const textColor = useColorModeValue(theme.colors.brand.black, theme.colors.brand.darkBlack);
   const navigate = useNavigate();
   const projects = [
    { id: 1, name: 'Проект Альфа',
     description: 'Проект Альфа - это инновационный проект, направленный на разработку передовых технологических решений.',
     imageUrl: 'https://placehold.co/640x360'
     },
    { id: 2, name: 'Проект Бэта',
     description: 'Проект Бэта - это проект, который направлен на разработку новых идей и технологий.',
     imageUrl: 'https://placehold.co/640x360'
     },
    { id: 3, name: 'Проект Гамма',
     description: 'Проект Гамма - это проект, который направлен на разработку новых идей и технологий.',
     imageUrl: 'https://placehold.co/640x360'
     },
  ];

  return (
    <Box 
      p={6} 
      color={textColor} 
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Text fontSize="3xl" fontWeight="bold">Проекты</Text>

      <Flex 
        alignItems="start" 
        pt={6}
        mb={6}
        gap={10}
        flexDirection="column"
      >
        <Button
          leftIcon={<MdAdd />}
          onClick={() => navigate('/projects/create')}
          colorScheme="teal"
          size="lg"
        >
          Создать проект
        </Button>
      </Flex>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, xl: 4 }} 
        spacing={6}
      >
        {projects.map((project) => (
          <ProjectItem 
            key={project.id} 
            project={project}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectsRoute;
