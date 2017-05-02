const Base58Check = require('../lib/Base58Check.js');
const Wallet = require('../lib/Wallet.js');

describe('Master wallet creation', () => {
  it('From 128 bit seed', () => {
    const wallet = new Wallet(Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'), true);
    console.log(wallet);
    console.log(wallet.uncompressedPublicKey.toString('hex'));
    console.log(wallet.uncompressedPublicKey.length);
    console.log(wallet.compressedPublicKey.toString('hex'));
    console.log(wallet.compressedPublicKey.length);
    const walletAddress1 = new Base58Check(Buffer.from('006780fb7befcd9e2c8fcf4d65c2a0088bec09683c', 'hex'));
    console.log(walletAddress1);
    const walletAddress2 = new Base58Check('1ASH7cP56e26xBgdAjTerNzdD6VQHSfq1N');
    console.log(walletAddress2);
  });
});
