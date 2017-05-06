const assert = require('assert');
const { Base58Check } = require('../index.js');
const testValues = require('./base58TestValues');

describe('[Base58Check] Base 58 encoding', () => {
  it('Encodes a list of raw values', () => {
    for (let i = 0; i < testValues.length; i += 1) {
      const data = new Base58Check(Buffer.from(testValues[i].rawValue, 'hex'));
      assert.strictEqual(typeof data, 'object');
      assert.strictEqual(data instanceof Base58Check, true);
      assert.strictEqual(typeof data.rawValue, 'object');
      assert.strictEqual(data.rawValue instanceof Buffer, true);
      assert.strictEqual(data.rawValue.toString('hex'), testValues[i].rawValue);
      assert.strictEqual(data.encodedValue, testValues[i].encodedValue);
    }
  });
});
describe('[Base58Check] Base 58 decoding', () => {
  it('Decodes a list of encoded values', () => {
    for (let i = 0; i < testValues.length; i += 1) {
      const data = new Base58Check(testValues[i].encodedValue);
      assert.strictEqual(typeof data, 'object');
      assert.strictEqual(data instanceof Base58Check, true);
      assert.strictEqual(typeof data.rawValue, 'object');
      assert.strictEqual(data.rawValue instanceof Buffer, true);
      assert.strictEqual(data.rawValue.toString('hex'), testValues[i].rawValue);
      assert.strictEqual(data.encodedValue, testValues[i].encodedValue);
    }
  });
});
describe('[Base58Check] Invalid arguments', () => {
  it('Empty raw value', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check('');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Encoded value has less than 4 bytes of data');
  });
  it('No first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check();
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'The first argument must be wither a string (encoded value) or a buffer (raw value)');
  });
  it('Null first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check(null);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'The first argument must be wither a string (encoded value) or a buffer (raw value)');
  });
  it('Number first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check(439299279);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'The first argument must be wither a string (encoded value) or a buffer (raw value)');
  });
  it('Boolean first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check(true);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'The first argument must be wither a string (encoded value) or a buffer (raw value)');
  });
  it('Corrupted encoded value', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check('GEoyTZ8zjZv');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Encoded value is corrupted');
  });
  it('Invalid encoded value', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new Base58Check('GEoyTZ8zjZl');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Encoded value contains characters not part of base58 encoding');
  });
});
