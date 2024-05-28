const { Web3 } = require('web3');

const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/");
const contractAddress = "0xad65fFD273c30BC92777587929395be6F4078466";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "encryptMessage",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEncryptedFlag",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

const account = '';

async function callContractGetEncryptedFlag() {
    try {
        const result = await contract.methods.getEncryptedFlag().call({ from: account });
        console.log('result :', result);
    } catch (error) {
        console.error(error);
    }
}

async function callContractEncryptMessage(message) {
    try {
        const result = await contract.methods.encryptMessage(message).call({ from: account });
        console.log('result :', result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

encrypted_passsword="2e4d7b5e778b44ca23c352b9662c5551d571e0495ce69f54a4db68bb2abbeab475f651a4ca5a4cc5ed66cf77bb92e023fcdca2065b0018edf98e81f1e314f83430bc498f5f94c90ed61ab2f9c3a77aee5114e0739f7f4607";
alphabet ="abcdefghijklmnopqrstuvwxyz @'?*!#$%&+-.:;=><~ABCDEFGHIJKLMNOPQRSTUVWXYZ";


async function decrypt(){
    const encrypted_pairs = [
        "2e", "4d", "7b", "5e", "77", "8b", "44", "ca", "23", "c3", "52", "b9", "66", "2c", "55", "51", "d5", "71", "e0", "49", "5c", "e6", "9f", "54", "a4", "db", "68", "bb", "2a", "bb", "ea", "b4", "75", "f6", "51", "a4", "ca", "5a", "4c", "c5", "ed", "66", "cf", "77", "bb", "92", "e0", "23", "fc", "dc", "a2", "06", "5b", "00", "18", "ed", "f9", "8e", "81", "f1", "e3", "14", "f8", "34", "30", "bc", "49", "8f", "5f", "94", "c9", "0e", "d6", "1a", "b2", "f9", "c3", "a7", "7a", "ee", "51", "14", "e0", "73", "9f", "7f", "46", "07"
    ];
    
    
    decrypted_password="";
    
    for(let i=0; i<encrypted_pairs.length; i++){
    
        currentPair=encrypted_pairs[i];
        let trouve =false;
    
        for(let j=0; j<alphabet.length;j++){

            console.log(alphabet[j]);
            let currentCarEncrypt=await callContractEncryptMessage(decrypted_password+alphabet[j]);
            
            currentCarEncrypt=currentCarEncrypt.slice(-2);
            console.log(currentCarEncrypt);
            console.log(currentPair);
    
            if(currentCarEncrypt==currentPair){
                decrypted_password+=alphabet[j];
                trouve=true;
                break;
            }
        }

        if(trouve==false){
            decrypted_password+="_";
        }
        
    }

    console.log(decrypted_password);
}

decrypt();









