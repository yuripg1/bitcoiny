const crypto = require('crypto');

class Wallet {
  constructor(seed) {
    this.address = null;
    this.chainCode = null;
    this.compressedPublicKey = null;
    this.depth = null;
    this.extendedPrivateKey = null;
    this.index = null;
    this.isValid = null;
    this.path = null;
    this.privateKey = null;
    this.uncompressedPublicKey = null;
    if (typeof seed !== 'object' || !(seed instanceof Buffer)) {
      throw new Error('The seed must be a buffer');
    }
    this.extendedPrivateKey = Wallet.calculateExtendedPrivateKeyFromSeed(seed);
    this.privateKey = Wallet.getPrivateKeyExtendedPrivateKey(this.extendedPrivateKey);
    this.isValid = Wallet.isPrivateKeyValid(this.privateKey);
    this.chainCode = Wallet.getChainCodeFromExtendedPrivateKey(this.extendedPrivateKey);
    if (this.isValid) {
      this.uncompressedPublicKey = Wallet.getUncompressedPublicKeyFromPrivateKey(this.privateKey);
      this.compressedPublicKey = Wallet.getCompressedPublicKeyFromPrivateKey(this.privateKey);
      this.address = Wallet.calculateAddressFromUncompressedPublicKey(this.uncompressedPublicKey);
    }
  }
  static calculateExtendedPrivateKeyFromSeed(seed) {
    if ([16, 23, 64].indexOf(seed.length) === (-1)) {
      throw new Error('The seed must contain either 128, 256 or 512 bits');
    }
    return crypto.createHmac('sha512', 'Bitcoin seed').update(seed).digest();
  }
  static getPrivateKeyExtendedPrivateKey(hmac) {
    const privateKey = Buffer.alloc(32);
    hmac.copy(privateKey, 0, 0, 32);
    return privateKey;
  }
  static getChainCodeFromExtendedPrivateKey(hmac) {
    const chainCode = Buffer.alloc(32);
    hmac.copy(chainCode, 0, 32, 64);
    return chainCode;
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
}
module.exports = Wallet;
