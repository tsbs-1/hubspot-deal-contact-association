import React from 'react';
import {
  Input,
  Flex,
  Text
} from '@hubspot/ui-extensions';

const SearchBox = ({
  value,
  onChange,
  placeholder = '検索...',
  disabled = false,
  label = null
}) => {
  const handleChange = (inputValue) => {
    if (onChange) {
      onChange(inputValue);
    }
  };
  
  return (
    <Flex direction="column" gap="small">
      {label && (
        <Text variant="microcopy" format={{ fontWeight: 'bold' }}>
          {label}
        </Text>
      )}
      <Input
        name="search"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </Flex>
  );
};

export default SearchBox;