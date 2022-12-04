# Decentralised Todo List App
A simple todo list dapp, making use of a smart contract written in Solidity, with a web frontend.

Smart contract and blockchain technology enables easy management of separate todo lists across different users. Test it out between 2 wallet addresses if you'd like. Just make sure to refresh your page when you swap wallet, of course.

(Based on a tutorial which can be found [here](https://www.youtube.com/watch?v=cyKvTo89HRY))

## Technologies used
Web frontend:
- Next.js
- React
- Typescript
- Chakra UI

Decentralised:
- Solidity (language for implementing smart contracts on the Ethereum blockchain)
- Truffle (tools for smart contracts and Ethereum blockchain)
- Ganache (local development blockchain)
- MetaMask (dapp browser and wallet manager)

# Usage
Once you are [set up](#setup), the frontend should be intuitive. The only thing to note is that any time you mark an item as complete or incomplete in your todo list, you will need to approve the move in MetaMask.

# Setup

## Web frontend
For the web app basics, you'll first need to install the required dependencies by going to the project root directory and running:

> `npm install`

You can then start up the frontend using:

> `npm run dev`

but it won't be of much use until we get our local blockchain up and running.

## Local blockchain

Then you will need to set up:
- Truffle
- Ganache
- Metamask

If you already have these things set up, then all you need to do is start Ganache, add Ganache as a network on MetaMask, and import a fake wallet from Ganache to MetaMask. Then you should be able to skip this section. 

In order to run a local blockchain, you'll need to install Truffle:

>`npm install -g truffle`

and Ganache, which you can download from their website [here](https://trufflesuite.com/ganache/), which you should start when finished downloading, as we will need it for the next steps [when we deploy our smart contract](#deploying-local-blockchain). Later we will [connect this local blockchain in Ganache to our frontend](#connecting-frontend-to-local-blockchain).

## Deploying smart contracts
When you have the local blockchain running, we first compile our smart contract:

> `truffle compile`

and then deploy the smart contract to our local blockchain:

> `truffle migrate --reset`

From here, we should be able to run our web app and see the dapp in action.

(You can run the web app using `npm run dev`)

## Connecting frontend to local blockchain
Finally, in order to make use of the web frontend of the dapp, you will need the [MetaMask](https://metamask.io/) browser extension. You will need to register for an account in order to make use of MetaMask, but __don't worry__, for this dapp we will only need to use fake accounts from our local blockchain, so __you're personal crypto wallet is safe__ :)

Once you have Ganache running, you can [add Ganache as a network on MetaMask](https://dapp-world.com/blogs/01/how-to-connect-ganache-with-metamask-and-deploy-smart-contracts-on-remix-without-1619847868947) and then import fake accounts from the local blockchain using the private key for any address in the list from Ganache.

Now head back to your browser, refresh the frontend (ensuring that the wallet address you are using is connected to the frontend), and give it a go.

## Testing deployment to local blockchain (Optional)
If you'd like to test the local blockchain deployment of the smart contract, you can run:

> `truffle console`

which runs a JS console from which we can call an instance of our contract and then call a few functions on the contract. Below are some examples, which you can enter line by line.

```js
todoListContract = await TodoList.deployed()

account = await web3.eth.getCoinbase()
account // see output

web3.eth.getBalance(account) // see output

// Get an instance of taskCount using the function we created in our smart contract
taskCount = await todoListContract.taskCount(account)
taskCount // see output

taskCount.toNumber() // see output

theTask = await todoListContract.tasks(account, 0)
```