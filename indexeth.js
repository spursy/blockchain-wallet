const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');

let Init = async function() {
    try {
        const mnemonic = bip39.generateMnemonic(); //generates string
        console.log(`The mnemonic is ${mnemonic}.`);

        const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        const root = hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');

        const addrNode = root.derive("m/44'/60'/0'/0/0");
        const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const address = ethUtil.toChecksumAddress(addr);

        console.log(`The address is ${address}.`);
    } catch (error) {
        console.log(error.stack);
    }
}

Init()