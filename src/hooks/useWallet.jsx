//create a simple useWallet hook
import { useState } from 'react';
import Web3 from 'web3';

export const useWallet = () => {
	const [address, setAddress] = useState < string | null > (null);
	const [web3, setWeb3] = useState < any > (null);

	const connect = async () => {
		//connect to wallet
		try {
			if (window.ethereum) {
				const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
				setWeb3(web3);
				const accounts = await web3.eth.requestAccounts();
				setAddress(accounts[0]);
			} else {
				console.log("Install Metamask");
			}
		} catch (error) {
			console.log("Error connecting wallet", error);
		}

	};

	const disconnect = async () => {
		//disconnect from wallet
	};

	return { address, connect, disconnect };
};