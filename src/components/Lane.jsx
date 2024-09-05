import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import DraggableDiv from './DraggableDiv';

const Lane = ({ lane, laneIndex, moveBlock, deleteBlock, onOpenModal }) => {
  return (
    <Box
      bg="#81E6D9"
      p={4}
      borderRadius="md"
      m={2}
      w="300px"
      boxShadow="md"
    >
      <Heading size="md" mb={4}>{lane.name}</Heading>
      <VStack spacing={4} align="start">
        {lane.items.map((item, index) => (
          <DraggableDiv
            key={index}
            item={item}
            index={index}
            laneIndex={laneIndex}
            onOpenModal={onOpenModal}
            deleteBlock={deleteBlock}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Lane;
