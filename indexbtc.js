const bip39 = require('bip39');
const hdkey = require('hdkey');
const createHash = require('create-hash');
const bs58check = require('bs58check');

let Init = async function() {
    try {
        const mnemonic = bip39.generateMnemonic();
        const seed = bip39.mnemonicToSeed(mnemonic);

        const root = hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');
        
        const addrnode = root.derive("m/44'/60'/0'/0/0");

        const step1 = addrnode._publicKey;
        const step2 = createHash('sha256').update(step1).digest();
        console.log(step2);
        const step3 = createHash('rmd160').update(step2).digest();
        console.log(step3);       

        var step4 = Buffer.allocUnsafe(21);
        // add 0x00 for mainnet, add 0x6f for testnet
        step4.writeUInt8(0x00, 0);
        step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
        const step9 = bs58check.encode(step4);
        console.log('Base58Check: ' + step9);

    } catch (error) {
        console.log(error.stack);
    }
}

Init();