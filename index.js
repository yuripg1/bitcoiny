const Base58Check = require('./lib/Base58Check.js');
const RootSeed = require('./lib/RootSeed.js');
const Wallet = require('./lib/Wallet.js');

module.exports.Base58Check = Base58Check;
module.exports.RootSeed = RootSeed;
module.exports.Wallet = Wallet;

/*
TO DO:
- Finish BIP32 implementation
- Code BIP 38 implementation
*/
