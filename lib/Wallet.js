const crypto = require('crypto');
const Base58Check = require('../lib/Base58Check');

class Wallet {
  constructor(extendedKey) {
    this.address = null;
    this.chainCode = null;
    this.childNumber = null;
    this.compressedPublicKey = null;
    this.depth = null;
    this.extendedPrivateKey = null;
    this.identifier = null;
    this.isValid = null;
    this.network = null;
    this.parentFingerprint = null;
    this.privateKey = null;
    this.uncompressedPublicKey = null;
    if (typeof extendedKey !== 'string') {
      throw new Error('The extended key must be a string');
    }
    const serializedExtendedKey = (new Base58Check(extendedKey)).rawValue;
    if (serializedExtendedKey.length !== 78) {
      throw new Error('The extended key must have 78 bytes');
    }
    const unserializedExtendedKey = Wallet.unserializeExtendedKey(serializedExtendedKey);
    this.network = unserializedExtendedKey.network;
    this.depth = unserializedExtendedKey.depth;
    this.parentFingerprint = unserializedExtendedKey.parentFingerprint;
    this.childNumber = unserializedExtendedKey.childNumber;
    this.chainCode = unserializedExtendedKey.chainCode;
    if (unserializedExtendedKey.keyType === 'private') {
      this.extendedPrivateKey = serializedExtendedKey;
      this.privateKey = unserializedExtendedKey.keyValue;
      this.isValid = Wallet.isPrivateKeyValid(this.privateKey);
      if (this.isValid) {
        this.uncompressedPublicKey = Wallet.getUncompressedPublicKeyFromPrivateKey(this.privateKey);
        this.compressedPublicKey = Wallet.getCompressedPublicKeyFromPrivateKey(this.privateKey);
        this.address = Wallet.calculateAddressFromUncompressedPublicKey(this.uncompressedPublicKey);
        // eslint-disable-next-line max-len
        this.identifier = Wallet.calculateIdentifierFromCompressedPublicKey(this.compressedPublicKey);
      }
    } else if (unserializedExtendedKey.keyType === 'public') {
      this.compressedPublicKey = unserializedExtendedKey.keyValue;
      throw new Error('Extended public keys are not yet supported');
    }
  }
  static unserializeExtendedKey(serializedExtendedKey) {
    let network;
    let keyType;
    switch (serializedExtendedKey.slice(0, 4).toString('hex')) {
      case '0488b21e':
        network = 'mainnet';
        keyType = 'public';
        break;
      case '0488ade4':
        network = 'mainnet';
        keyType = 'private';
        break;
      case '043587cf':
        network = 'testnet';
        keyType = 'public';
        break;
      case '04358394':
        network = 'testnet';
        keyType = 'private';
        break;
      default:
        throw new Error('Invalid version');
    }
    const depth = serializedExtendedKey.slice(4, 5).readUInt8();
    const parentFingerprint = serializedExtendedKey.slice(5, 9);
    const childNumber = serializedExtendedKey.slice(9, 13).readUInt32BE();
    const chainCode = serializedExtendedKey.slice(13, 45);
    let keyValue;
    if (keyType === 'private') {
      keyValue = serializedExtendedKey.slice(46, 78);
    } else if (keyType === 'public') {
      keyValue = serializedExtendedKey.slice(45, 78);
    }
    const unserializedExtendedKey = {
      network,
      keyType,
      depth,
      parentFingerprint,
      childNumber,
      chainCode,
      keyValue,
    };
    return unserializedExtendedKey;
  }
  static isPrivateKeyValid(privateKey) {
    let isValid = true;
    const ecdh = crypto.createECDH('secp256k1');
    try {
      ecdh.setPrivateKey(privateKey);
    } catch (e) {
      isValid = false;
    }
    return isValid;
  }
  static getUncompressedPublicKeyFromPrivateKey(privateKey) {
    const ecdh = crypto.createECDH('secp256k1');
    ecdh.setPrivateKey(privateKey);
    return ecdh.getPublicKey();
  }
  static getCompressedPublicKeyFromPrivateKey(privateKey) {
    const ecdh = crypto.createECDH('secp256k1');
    ecdh.setPrivateKey(privateKey);
    return ecdh.getPublicKey(null, 'compressed');
  }
  static calculateAddressFromUncompressedPublicKey(uncompressedPublicKey) {
    const firstHash = crypto.createHash('sha256').update(uncompressedPublicKey).digest();
    const secondHash = crypto.createHash('ripemd160').update(firstHash).digest();
    const address = Buffer.alloc(21);
    secondHash.copy(address, 1, 0, 20);
    return address;
  }
  static calculateIdentifierFromCompressedPublicKey(compressedPublicKey) {
    const firstHash = crypto.createHash('sha256').update(compressedPublicKey).digest();
    const secondHash = crypto.createHash('ripemd160').update(firstHash).digest();
    return secondHash;
  }
  static calculateExtendedPrivateKeyFromSeed(seed) {
    if ([16, 23, 64].indexOf(seed.length) === (-1)) {
      throw new Error('The seed must contain either 128, 256 or 512 bits');
    }
    return crypto.createHmac('sha512', 'Bitcoin seed').update(seed).digest();
  }
  static getChainCodeFromExtendedPrivateKey(hmac) {
    const chainCode = Buffer.alloc(32);
    hmac.copy(chainCode, 0, 32, 64);
    return chainCode;
  }
  static getPrivateKeyExtendedPrivateKey(hmac) {
    const privateKey = Buffer.alloc(32);
    hmac.copy(privateKey, 0, 0, 32);
    return privateKey;
  }
  static fromSeed(seed, network = 'mainnet') {
    if (typeof seed !== 'object' || !(seed instanceof Buffer)) {
      throw new Error('The seed must be a buffer');
    }
    const extendedPrivateKey = Wallet.calculateExtendedPrivateKeyFromSeed(seed);
    let version;
    switch (network) {
      case 'mainnet':
        version = Buffer.from('0488ade4', 'hex');
        break;
      case 'testnet':
        version = Buffer.from('04358394', 'hex');
        break;
      default:
        throw new Error('Network should be either mainnet or testnet');
    }
    const depth = Buffer.from('00', 'hex');
    const parentFingerprint = Buffer.from('00000000', 'hex');
    const childNumber = Buffer.from('00000000', 'hex');
    const chainCode = Wallet.getChainCodeFromExtendedPrivateKey(extendedPrivateKey);
    const keyValue = Buffer.concat([
      Buffer.from('00', 'hex'),
      Wallet.getPrivateKeyExtendedPrivateKey(extendedPrivateKey),
    ]);
    const serializedExtendedPrivateKey = new Base58Check(Buffer.concat([
      version,
      depth,
      parentFingerprint,
      childNumber,
      chainCode,
      keyValue,
    ]));
    return new Wallet(serializedExtendedPrivateKey.encodedValue);
  }
}
module.exports = Wallet;
