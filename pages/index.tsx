import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer } from '@chakra-ui/react'
import React from 'react'
import { load } from '../src/funcs';

export default function Home() {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  
  // Values from smart contract
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);
  
  // Keep count of complete and incomplete tasks
  const [completedCount, setCompletedCount] = React.useState<number>(0)
  const [uncompletedCount, setUncompletedCount] = React.useState<number>(0)

  // Perform count of complete and incomplete tasks
  const countCompleted = (tasks: any[]) => {
    let comp = 0;
    let uncomp = 0;

    for (let task of tasks) {
      if (task[2]) {
        comp++;
      }
      else {
        uncomp++;
      }
    }

    setCompletedCount(comp);
    setUncompletedCount(uncomp);
  }

  // Handlers
  const handleInputChange = (e: any) => setInput(e.currentTarget.value);
  const handleAddTask = async () => {
    await contract.createTask(input, {from: addressAccount});
    setInput('');
    setRefresh(true);
  };
  const handleToggled = async (id: number, done: boolean) => {
    await contract.toggleCompleted(id, {from: addressAccount});
    setRefresh(true);
  };

  // Reload from smart contract on updates which affect the data stored there
  React.useEffect(() => {
    if (!refresh) return;
    
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setContract(e.currContract);
      setTasks(e.tasks);
      countCompleted(e.tasks);
    })
  });

  return (
    <VStack>
        <Head>
          <title>Todo List</title>
          <meta name="description" content="Decentralised Todo List" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <HStack w="full">
          <Spacer />

          <VStack>
            <Heading>Decentralised TodoList</Heading>
            <Box h='30px' />
            
            {/* Add new item to list */}
            <HStack w='md'>
              <Input
                type='text'
                size='md'
                placeholder='New Task...'
                onChange={handleInputChange}
                value={input}
              />
              <Button onClick={handleAddTask} bg='green.200'>ADD</Button>
            </HStack>

            <Box h='30px' />

            {/* Items to do */}
            <HStack>
              <Text fontWeight='bold'>TODO</Text>
              <Text>[{uncompletedCount}]</Text>
            </HStack>
            {/* List items */}
            {
              uncompletedCount == 0 ? <Text fontSize='sm' fontWeight='light'>Awful quiet around here...</Text>
              : tasks.map((task:any, idx:number) => !task[2] &&
                <HStack key={idx} bg='gray.100'>
                  <Box w='5px' borderRadius={7} />
                  <Text>{task[1]}</Text>
                  <Box w='15px' />
                  <Button bg='green.300' onClick={ () => handleToggled(task[0].toNumber(), true) }>Mark as Complete</Button>
                </HStack>
              )
            }

            <Box h='10px' />

            {/* Completed items */}
            <HStack>
              <Text fontWeight='bold'>DONE</Text>
              <Text>[{completedCount}]</Text>
            </HStack>
            {/* List items */}
            {
              completedCount == 0 ? <Text fontSize='sm' fontWeight='light'>Come on. Do something!</Text>
              : tasks.map((task:any, idx:number) => task[2] &&
                <HStack key={idx} bg='gray.100'>
                  <Box w='5px' borderRadius={7} />
                  <Text>{task[1]}</Text>
                  <Box w='15px' />
                  <Button bg='red.300' onClick={ () => handleToggled(task[0].toNumber(), false) }>Mark as Incomplete</Button>
                </HStack>
              )
            }

          </VStack>

          <Spacer />
        </HStack>
    </VStack>
  )
}
