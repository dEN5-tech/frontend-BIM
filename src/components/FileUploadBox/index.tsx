import { useRef, useState } from "react";
import { VStack, HStack, Text, IconButton, Spinner, Input } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";


const FileUploadBox = () => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to store the uploaded files
  
    const handleClick = () => {
      hiddenFileInput.current?.click();
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    };
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setIsLoading(true);
        console.log("Uploading files:", files);
  
        // Simulate a file upload delay
        setTimeout(() => {
          console.log("Files uploaded:", files);
          setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Append new files to the existing array
          setIsLoading(false);
        }, 2000); // Simulate upload time
      }
    };
    return (
      <VStack
        position="relative"
        p="20px"
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: "gray.100" }}
        onClick={handleClick}
        alignItems="center"
        justifyContent="center"
        height="200px"
        width="100%"
      >
        <form onSubmit={handleSubmit} style={{ height: 0, overflow: "hidden" }}>
          <Input
            ref={hiddenFileInput}
            type="file"
            hidden
            multiple // Allow multiple file selection
            onChange={handleFileChange}
          />
        </form>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <>
            {uploadedFiles.map((file, index) => (
              <HStack key={index} spacing={2}>
                <Text>{file.name}</Text>
              </HStack>
            ))}
            <IconButton
              aria-label="Upload more files"
              icon={<AttachmentIcon />}
              isRound
              size="lg"
              variant="ghost"
            />
          </>
        )}
      </VStack>
    );
  };

export default FileUploadBox;


