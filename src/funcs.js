// JSON file generated by truffle when compile contract
import TodoListJSON from '../build/contracts/TodoList.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    const currContract = await loadContract();
    const { taskCount, tasks } = await loadTasks(currContract, addressAccount);
    return { addressAccount, currContract, taskCount, tasks };
};

const loadTasks = async (currContract, addressAccount) => {
    const taskCount = await currContract.taskCount(addressAccount);
    const tasks = [];
    for (let i = 0; i < taskCount; i++) {
        const task = await currContract.tasks(addressAccount, i);
        tasks.push(task);
    }
    return { taskCount, tasks };
};

// Get instance of our contract
const loadContract = async () => {
    const todoContract = contract(TodoListJSON);
    todoContract.setProvider(web3.eth.currentProvider);
    const currContract = await todoContract.deployed();

    return currContract;
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Accounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Accounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};