import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  useToast,
  useMediaQuery,
  Text,
} from '@chakra-ui/react';
import MoveBlockModal from './MoveBlockModal';
import DraggableDiv from './DraggableDiv';
import Lane from './Lane';

const DragDropContainer = () => {
  const [lanes, setLanes] = useState([
    { name: 'Lane 1', items: [] },
    { name: 'Lane 2', items: [] },
    { name: 'Lane 3', items: [] },
  ]);
  const [blockName, setBlockName] = useState('');
  const [selectedLane, setSelectedLane] = useState(0);
  const [moveBlockData, setMoveBlockData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ from: '', to: '', action: 'allow' });
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  const moveBlock = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
    const sourceLaneIndexStr = (sourceLaneIndex + 1).toString();
    const targetLaneIndexStr = (targetLaneIndex + 1).toString();
  
    const rule = rules.find(
      (r) => r.from === sourceLaneIndexStr && r.to === targetLaneIndexStr
    );
  
    if (rule && rule.action === 'deny') {
      toast({
        title: 'Move Denied',
        description: `You are not allowed to move blocks from Lane ${sourceLaneIndex + 1} to Lane ${targetLaneIndex + 1}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    const updatedLanes = [...lanes];
    const [movedItem] = updatedLanes[sourceLaneIndex].items.splice(blockIndex, 1);
    movedItem.history.push(`Moved from ${updatedLanes[sourceLaneIndex].name} to ${updatedLanes[targetLaneIndex].name}`);
    updatedLanes[targetLaneIndex].items.push(movedItem);
    setLanes(updatedLanes);
  };

  const handleAddBlock = () => {
    if (blockName.trim()) {
      const updatedLanes = [...lanes];
      updatedLanes[selectedLane].items.push({
        divName: blockName,
        history: [],
      });
      setLanes(updatedLanes);
      setBlockName('');
    }
  };

  const handleRuleChange = (e) => {
    const { name, value } = e.target;
    setNewRule({ ...newRule, [name]: value });
  };

  const addRule = () => {
    if (newRule.from !== '' && newRule.to !== '') {
      setRules([...rules, newRule]);
      setNewRule({ from: '', to: '', action: 'allow' });
    }
  };

  const onOpenModal = (blockIndex, sourceLaneIndex) => {
    setMoveBlockData({ blockIndex, sourceLaneIndex });
    setIsModalOpen(true);
  };

  const onMoveBlock = (blockIndex, sourceLaneIndex, targetLaneIndex) => {
    moveBlock(blockIndex, sourceLaneIndex, targetLaneIndex);
    setMoveBlockData(null);
  };

  const deleteBlock = (blockIndex, laneIndex) => {
    const updatedLanes = [...lanes];
    updatedLanes[laneIndex].items.splice(blockIndex, 1);
    setLanes(updatedLanes);
  };

  return (
    <ChakraProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}  >
        <Container maxW="container.xl" p={4}>
          <Flex direction="column" mb={4}>
            <Heading mb={4}>Drag and Drop Interface</Heading>
            <Flex direction="row" mb={4} wrap="wrap">
              {lanes.map((lane, index) => (
                <Lane
                  key={index}
                  lane={lane}
                  laneIndex={index}
                  moveBlock={moveBlock}
                  deleteBlock={deleteBlock}
                  onOpenModal={onOpenModal}
                />
              ))}
            </Flex>
            <Flex direction="row" mb={4}>
              <FormControl id="block-name" mr={4}>
                <FormLabel>Block Name</FormLabel>
                <Input
                  value={blockName}
                  onChange={(e) => setBlockName(e.target.value)}
                  placeholder="Enter block name"
                />
              </FormControl>
              <FormControl id="lane-select">
                <FormLabel>Select Lane</FormLabel>
                <Select
                  value={selectedLane}
                  onChange={(e) => setSelectedLane(parseInt(e.target.value, 10))}
                >
                  {lanes.map((lane, index) => (
                    <option key={index} value={index}>
                      {lane.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleAddBlock} colorScheme="teal" ml={3} padding={"6"}>
                Add Block
              </Button>
            </Flex>
            <Flex direction="column">
              <Heading mb={4}>Manage Rules</Heading>
              <Flex direction="row" mb={4}>
                <FormControl id="from-lane" mr={4}>
                  <FormLabel>From Lane</FormLabel>
                  <Select
                    name="from"
                    value={newRule.from}
                    onChange={handleRuleChange}
                  >
                    <option value="">Select lane</option>
                    {lanes.map((lane, index) => (
                      <option key={index+1} value={index+1}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="to-lane" mr={4}>
                  <FormLabel>To Lane</FormLabel>
                  <Select
                    name="to"
                    value={newRule.to}
                    onChange={handleRuleChange}
                  >
                    <option value="">Select lane</option>
                    {lanes.map((lane, index) => (
                      <option key={index+1} value={index+1}>
                        {lane.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="action">
                  <FormLabel>Action</FormLabel>
                  <Select
                    name="action"
                    value={newRule.action}
                    onChange={handleRuleChange}
                  >
                    <option value="allow">Allow</option>
                    <option value="deny">Deny</option>
                  </Select>
                </FormControl>
                <Button onClick={addRule} colorScheme="blue" ml={4} padding={"6"}>
                  Add Rule
                </Button>
              </Flex>
              <Flex direction="column" mt={4}>
                <Heading size="sm" mb={2}>Rules:</Heading>
                {rules.length === 0 ? (
                  <Text>No rules defined</Text>
                ) : (
                  rules.map((rule, index) => (
                    <Text key={index}>
                      From Lane {rule.from} to Lane {rule.to}: {rule.action}
                    </Text>
                  ))
                )}
              </Flex>
            </Flex>
          </Flex>
        </Container>
        {moveBlockData && (
          <MoveBlockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            lanes={lanes}
            onMoveBlock={onMoveBlock}
            blockIndex={moveBlockData.blockIndex}
            sourceLaneIndex={moveBlockData.sourceLaneIndex}
          />
        )}
      </DndProvider>
    </ChakraProvider>
  );
};

export default DragDropContainer;
