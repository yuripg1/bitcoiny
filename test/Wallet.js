const Wallet = require('../lib/Wallet');

describe('[Wallet] Create wallet from seed', () => {
  it('Create wallet from 128 bit seed', () => {
    Wallet.fromSeed(Buffer.from('1d64815716b8606db0bc27171099d250', 'hex'));
  });
});
