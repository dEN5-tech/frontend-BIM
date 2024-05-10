import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

type SearchInputProps = {
  debounceTime?: number;
  placeholder?: string;
  inputGroupRef?: React.RefObject<HTMLDivElement>;
  onChange?: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  debounceTime = 300,
  placeholder = "Поиск...",
  inputGroupRef,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const handler = setTimeout(() => {
      if (onChange) {
        onChange(inputValue);
      }
    }, debounceTime);
    setDebounceTimer(handler);

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [inputValue, debounceTime, onChange]);

  const clearInput = () => {
    setInputValue("");
    if (onChange) {
      onChange("");
    }
  };

  return (
    <InputGroup ref={inputGroupRef} mb={4}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="brand.black" />
      </InputLeftElement>
      <Input
        bg="brand.white"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <InputRightElement>
          <IconButton
            aria-label="Clear input"
            icon={<CloseIcon />}
            size="sm"
            onClick={clearInput}
            variant="ghost"
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchInput;
