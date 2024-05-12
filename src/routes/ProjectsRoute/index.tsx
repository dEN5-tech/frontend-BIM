import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import theme from '../../theme'; // Import custom theme
import ProjectItem from '../../components/ProjectItem';

const ProjectsRoute = () => {
   const textColor = useColorModeValue(theme.colors.brand.black, theme.colors.brand.darkBlack);
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
    <Box p={4} color={textColor}>
      <Text fontSize="2xl" mb={4}>Проекты</Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 3 }} spacing={4}>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectsRoute;
