// Packages
import React, {FC, useRef, useState} from 'react';

// Assets
import {FiSearch} from 'react-icons/fi';

// UI
import {
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  Text,
  Heading,
  Box,
  BoxProps,
  VStack,
  useOutsideClick
} from '@chakra-ui/react';

import bingApi from 'services/bingApi';
import {useAppContext, useAsync} from 'hooks';
import {Resource} from 'types/common';
import {useEffect} from 'react';
import {LatLngTuple} from 'leaflet';

// Component
const Searchbar: FC<BoxProps> = props => {
  const {setCoords} = useAppContext();

  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState<string>('');

  const {run: getByQueryRun} = useAsync({
    asyncFunction: bingApi.getByQuery,
    onSuccess: ({resourceSets}) => {
      const searchResult = resourceSets[0].resources;
      if (searchResult) setResources(searchResult);
    }
  });

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false)
  });

  const handleSelectResource = (coords: LatLngTuple) => {
    setCoords(coords);
    setIsOpen(false);
  };

  console.log(resources);

  useEffect(() => {
    if (query) {
      getByQueryRun(query);
      setIsOpen(true);
    }
  }, [query, getByQueryRun]);

  return (
    <Box position="relative" {...props}>
      <Box mb={2}>
        <InputGroup>
          <InputLeftElement children={<FiSearch />} />
          <Input
            autoFocus
            value={query}
            onClick={() => setIsOpen(prev => !prev)}
            onChange={e => setQuery(e.target.value)}
          />
        </InputGroup>
      </Box>

      {isOpen && resources.length > 0 && (
        <VStack
          ref={ref}
          position="absolute"
          top="100%"
          w="100%"
          bg="white"
          rounded="md"
          overflow="hidden"
          shadow="lg"
          borderWidth={1}
          align="stretch"
          divider={<StackDivider />}
          spacing={0}>
          {resources.map(
            (
              {address: {locality, formattedAddress}, geocodePoints},
              i: number
            ) => (
              <Box
                py={3}
                px={6}
                key={i}
                cursor="pointer"
                _hover={{bg: 'blackAlpha.50'}}
                onClick={() =>
                  handleSelectResource(geocodePoints[0].coordinates)
                }>
                <Heading
                  fontSize="md"
                  fontWeight="medium"
                  textTransform="capitalize">
                  {locality}
                </Heading>
                <Text fontSize="sm" color="gray.600" textTransform="capitalize">
                  {formattedAddress}
                </Text>
              </Box>
            )
          )}
        </VStack>
      )}
    </Box>
  );
};
export default Searchbar;
