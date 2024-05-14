import { Box, VStack, Text, useColorModeValue, IconButton } from '@chakra-ui/react';
import { MdArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const ProjectItem = ({ project }: { project: Project }) => {
  const textColor = useColorModeValue('white', 'white'); // Ensuring text is visible on potentially dark backgrounds
  const navigate = useNavigate();

  return (
    <Box
      width={{ base: "100%", sm: "100%", md: "100%", xl: "100%" }}
      border="1px solid"
      borderColor="gray.200"
      rounded="md"
      p={4}
      bgImage={`url('${project.imageUrl}')`}
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'scale(1.05)' }}
    >
      <VStack spacing={4} height="100%" justifyContent="flex-end">
        <Text color={textColor} fontSize="lg" fontWeight="bold" bg="rgba(0, 0, 0, 0.5)" p={2} rounded="md" textAlign="center">
          {project.name}
        </Text>
        <Text color={textColor} bg="rgba(0, 0, 0, 0.5)" p={2} rounded="md" textAlign="center">
          {project.description}
        </Text>
        <IconButton
          aria-label="Go to project details"
          icon={<MdArrowRight size="30px" />}
          onClick={() => navigate(`/projects/${project.id}`)}
          variant="ghost"
          colorScheme="teal"
          rounded="full"
        />
      </VStack>
    </Box>
  );
};

export default ProjectItem;