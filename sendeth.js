const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const ethTx = require('ethereumjs-tx');
const Web3 = require('web3');

let Init = async function() {
    try {
        let mnemonic = "give noodle lunar rural expose disagree vault warrior explain mosquito salt add";

        const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        const root = hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');
        const addrNode = root.derive("m/44'/60'/0'/0/0");

        const params = {
            nonce: 0,
            to: '0x81b7e08f65bdf5648606c89998a9cc8164397647',
            value: '0.1',
            gasPrice: 5000000000,
            gasLimit: 21000,
            chainId: 3
        };

        const tx = new ethTx(params);
        //Signing the transaction with the correct private key
        tx.sign(addrNode._privateKey);
        const serializedTx = tx.serialize();

        console.log(serializedTx.toString('hex'));
        
        const web3 = new Web3(
            new Web3.providers.HttpProvider('http://localhost:3002')
        );
         //Verify connection is successful
        web3.eth.net.isListening()
            .then(() => console.log('is connected'))
            .catch(e => console.log('Wow. Something went wrong'));
         
        web3.eth.sendSignedTransaction(
            `0x${serializedTx.toString('hex')}`, 
            (error, result) => { 
                if (error) { console.log(`Error: ${error}`); }  
                else { console.log(`Result: ${result}`); } 
            } 
        );
    } catch (error) {
        console.log(error.stack);
    }
}

Init()