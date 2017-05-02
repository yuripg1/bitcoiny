const crypto = require('crypto');
const base58 = require('./base58.json');

const base58Map = {};
for (let i = 0; i < base58.length; i += 1) {
  base58Map[base58[i]] = i;
}
class Base58Check {
  constructor(input) {
    this.encodedValue = null;
    this.rawValue = null;
    if (typeof input === 'string') {
      this.encodedValue = input;
      this.rawValue = Base58Check.decode(input);
    } else if (typeof input === 'object' && input instanceof Buffer) {
      this.encodedValue = Base58Check.encode(input);
      this.rawValue = input;
    } else {
      throw new Error('The first argument must be wither a string (encoded value) or a buffer (raw value)');
    }
  }
  static getRawValue(decodedValue) {
    const rawValue = Buffer.allocUnsafeSlow(decodedValue.length - 4);
    const decodedValueChecksum = Buffer.alloc(4);
    decodedValue.copy(rawValue, 0, 0, decodedValue.length - 4);
    decodedValue.copy(decodedValueChecksum, 0, decodedValue.length - 4, decodedValue.length);
    const calculatedChecksum = Base58Check.calculateRawValueChecksum(rawValue);
    if (calculatedChecksum.toString('hex') !== decodedValueChecksum.toString('hex')) {
      throw new Error('Encoded value is corrupted');
    }
    return rawValue;
  }
  static decode(encodedValue) {
    if (encodedValue.length === 0) {
      return Buffer.alloc(0);
    }
    const bytes = [0];
    for (let i = 0; i < encodedValue.length; i += 1) {
      const value = base58Map[encodedValue[i]];
      if (typeof value === 'undefined') {
        throw new Error('Encoded value contains characters not part of base58 encoding');
      }
      let carry = value;
      for (let j = 0; j < bytes.length; j += 1) {
        carry += bytes[j] * 58;
        bytes[j] = carry % 256;
        carry = Math.floor(carry / 256);
      }
      while (carry > 0) {
        bytes.push(carry % 256);
        carry = Math.floor(carry / 256);
      }
    }
    for (let i = 0; encodedValue[i] === '1' && i < encodedValue.length - 1; i += 1) {
      bytes.push(0);
    }
    const decodedValue = Buffer.from(bytes.reverse());
    return Base58Check.getRawValue(decodedValue);
  }
  static calculateRawValueChecksum(rawValue) {
    const firstHash = crypto.createHash('sha256').update(rawValue).digest();
    const secondHash = crypto.createHash('sha256').update(firstHash).digest();
    const rawValueChecksum = Buffer.alloc(4);
    secondHash.copy(rawValueChecksum, 0, 0, 4);
    return rawValueChecksum;
  }
  static encode(rawValue) {
    const valueToBeEncoded = Buffer.concat([
      rawValue,
      Base58Check.calculateRawValueChecksum(rawValue),
    ]);
    if (valueToBeEncoded.length === 0) {
      return '';
    }
    const digits = [0];
    for (let i = 0; i < valueToBeEncoded.length; i += 1) {
      let carry = valueToBeEncoded[i];
      for (let j = 0; j < digits.length; j += 1) {
        carry += digits[j] * 256;
        digits[j] = carry % 58;
        carry = Math.floor(carry / 58);
      }
      while (carry > 0) {
        digits.push(carry % 58);
        carry = Math.floor(carry / 58);
      }
    }
    let encodedValue = '';
    for (let i = 0; valueToBeEncoded[i] === 0 && i < valueToBeEncoded.length - 1; i += 1) {
      encodedValue += base58[0];
    }
    for (let i = digits.length - 1; i >= 0; i -= 1) {
      encodedValue += base58[digits[i]];
    }
    return encodedValue;
  }
}
module.exports = Base58Check;
