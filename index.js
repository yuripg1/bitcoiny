const Base58Check = require('./lib/Base58Check');
const RootSeed = require('./lib/RootSeed');
const Wallet = require('./lib/Wallet');

module.exports.Base58Check = Base58Check;
module.exports.RootSeed = RootSeed;
module.exports.Wallet = Wallet;

/*
TO DO:
- Finish BIP32 implementation
  - Including extended public key support
- Code BIP 38 implementation
*/
