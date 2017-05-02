const Wallet = require('../lib/Wallet.js');

describe('Master wallet creation', () => {
  it('From 128 bit seed', () => {
    const wallet = new Wallet(Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex'), true);
    console.log(wallet);
    console.log(wallet.uncompressedPublicKey.toString('hex'));
    console.log(wallet.uncompressedPublicKey.length);
    console.log(wallet.compressedPublicKey.toString('hex'));
    console.log(wallet.compressedPublicKey.length);
  });
});
