pragma solidity >=0.4.22 <0.7.0;

contract TodoList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted (
        uint id,
        bool completed
    );

    // Always receives a key to search some unique value.
    // We want each wallet to have its own TodoList, so we use address.
    // In this case, we will pass that key to get another mapping function.
    // The second mapping function has a set of integers each of which represent a unique task .
    mapping(address => mapping(uint => Task)) public tasks;
    
    // Number of tasks deployed by this address
    mapping(address => uint) public taskCount;


    constructor() public {
        // createTask("Hello World!");
    }

    // Receive content of the task
    function createTask(string memory _content) public {
        uint count = taskCount[msg.sender];
        tasks[msg.sender][count] = Task(count, _content, false);
        emit TaskCreated(count, _content, false);
        taskCount[msg.sender]++;
    }

    function toggleCompleted(uint _id) public {
        Task memory task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        emit TaskCompleted(_id, task.completed);
    }


}