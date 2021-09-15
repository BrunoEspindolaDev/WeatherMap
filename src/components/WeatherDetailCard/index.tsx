// Packages
import React, {FC} from 'react';

// Assets
import {FiSearch} from 'react-icons/fi';

// UI
import {
  Flex,
  Heading,
  Text,
  SkeletonText,
  SkeletonCircle,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Icon
} from '@chakra-ui/react';
import Draggable from 'react-draggable';

// Hooks
import {useAppContext} from 'hooks';

// Utils
import {convertUnixUTCForDate} from 'utils/functions';
import Searchbar from 'components/Searchbar';

// Component
const WeatherDetailCard: FC = () => {
  const {
    weatherDetail: {isLoading, data}
  } = useAppContext();

  return (
    <Draggable>
      <Flex
        p={10}
        position="absolute"
        direction="column"
        top="80px"
        left="80px"
        w="100%"
        minW="350"
        maxW="400px"
        shadow="lg"
        rounded="lg"
        zIndex="modal"
        cursor="move"
        bg="white">
        <Heading fontSize="xl">Weather Forecast</Heading>
        <Text mb={5} color="gray.600">
          Select poin in map or typing location
        </Text>
        <Searchbar mb={5} />
        {isLoading && (
          <Box>
            <SkeletonCircle size="10" />
            <SkeletonText mt={4} mb={10} noOfLines={4} spacing="4" />
            <SkeletonText noOfLines={4} mb={10} spacing="4" />
            <SkeletonText noOfLines={4} spacing="4" />
          </Box>
        )}
        {!isLoading && data && !data.name && (
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            color="gray.600">
            <Icon as={FiSearch} w="64px" h="64px" strokeWidth={1} mb={3} />
            <Text fontWeight="medium">Location not found</Text>
            <Text fontSize="sm">Try again...</Text>
          </Flex>
        )}
        {!isLoading && data && data.name && (
          <Flex direction="column" align="stretch">
            <Flex direction="row" align="center" mb={5}>
              <Image
                mr={2}
                w="80px"
                h="80px"
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              />
              <Box>
                <Heading fontSize="lg" fontWeight="medium">
                  {data.name}
                </Heading>
                <Text fontSize="sm" fontWeight="light" color="gray.700">
                  {convertUnixUTCForDate(data.dt)}
                </Text>
              </Box>
            </Flex>
            <Table size="sm" variant="simple" mb={10}>
              <Thead>
                <Tr>
                  <Th>Temperature</Th>
                  <Th isNumeric>C°</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="me"
                    color="gray.600"
                    textTransform="uppercase">
                    Current
                  </Td>
                  <Td isNumeric>{data.temp}</Td>
                </Tr>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="normal"
                    color="gray.600"
                    textTransform="uppercase">
                    Min
                  </Td>
                  <Td isNumeric>{data.temp_min}</Td>
                </Tr>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="normal"
                    color="gray.600"
                    textTransform="uppercase">
                    Max
                  </Td>
                  <Td isNumeric>{data.temp_max}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table size="sm" variant="simple">
              <TableCaption>Powered by OpenWeather</TableCaption>
              <Thead>
                <Tr>
                  <Th>More Info</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="me"
                    color="gray.600"
                    textTransform="uppercase">
                    Wind Speed
                  </Td>
                  <Td isNumeric>
                    {parseFloat((data.speed * 3.6).toFixed(2))} km/h
                  </Td>
                </Tr>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="normal"
                    color="gray.600"
                    textTransform="uppercase">
                    Atmospheric Pressure
                  </Td>
                  <Td isNumeric>{data.pressure} Hpa</Td>
                </Tr>
                <Tr>
                  <Td
                    fontSize="xs"
                    fontWeight="normal"
                    color="gray.600"
                    textTransform="uppercase">
                    Humidity
                  </Td>
                  <Td isNumeric>{data.humidity} %</Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        )}
      </Flex>
    </Draggable>
  );
};

export default WeatherDetailCard;
