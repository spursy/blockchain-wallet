const bip39 = require('bip39');

let Init = async function() {
    try {
        // generate mnemonic
        var mnemonic = bip39.generateMnemonic();
        console.log(mnemonic);
        // transform mnemonic to entropy
        let entropy = bip39.mnemonicToEntropy(mnemonic);
        console.log(entropy);
        // transform entropy to mnemionic
        let verified_mnemonic = bip39.entropyToMnemonic(entropy);
        console.log(verified_mnemonic);
        console.log('--- --- --- ---');
        
        
        let seed = bip39.mnemonicToSeedHex(mnemonic);
        console.log(seed);
        // let mnemonic_words = bip39.mnemonicToEntropy(seed);
        // console.log(mnemonic_words);
        
    } catch (error) {
        console.log(error.stack);
    }
}

Init();