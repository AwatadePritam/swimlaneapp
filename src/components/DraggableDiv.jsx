import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, IconButton } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const DraggableDiv = ({ item, index, laneIndex, onOpenModal, deleteBlock }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { index, laneIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
    },
  });

  React.useEffect(() => {
    if (isDragging) {
      onOpenModal(index, laneIndex);
    }
  }, [isDragging, index, laneIndex, onOpenModal]);

  return (
    <Box
      ref={drag}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bg="#EDBB3C"
      p={4}
      mb={2}
      borderRadius="md"
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
      position="relative"
      boxShadow="md"
      w={'90%'}
    >
      <Text fontSize="lg" mb={2}>{item.divName}</Text>
      <Box display={'flex'} gap={'2'}>
      <Popover>
        <PopoverTrigger >
          <IconButton
            size="sm"
            icon={<InfoIcon />}
            aria-label="View History"
            title='Click to view History'
            variant="outline"
          />
        </PopoverTrigger>
        <PopoverContent width="100%">
          <PopoverHeader>Block History</PopoverHeader>
          <PopoverBody>
            {item.history.length > 0 ? (
              item.history.map((entry, idx) => (
                <Text key={idx} mb={1}>{entry}</Text>
              ))
            ) : (
              <Text>No history available</Text>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button  title='Click to Delete' size="sm" colorScheme="red" onClick={() => deleteBlock(index, laneIndex)} >
        Delete
      </Button>
      </Box>
    </Box>
  );
};

export default DraggableDiv;
