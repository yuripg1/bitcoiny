const crypto = require('crypto');
const wordList = require('./wordList.json');

class RootSeed {
  constructor(input, password) {
    this.entropy = null;
    this.mnemonicSentence = null;
    this.seed = null;
    let rootSeedPassword;
    if (typeof password !== 'undefined') {
      if (typeof password === 'string') {
        rootSeedPassword = password;
      } else {
        throw new Error('Password must be a string');
      }
    } else {
      rootSeedPassword = '';
    }
    if (typeof input === 'string') {
      this.mnemonicSentence = input;
      this.entropy = RootSeed.decodeMnemonicSentence(this.mnemonicSentence);
      this.seed = RootSeed.convertMnemonicSentenceToSeed(this.mnemonicSentence, rootSeedPassword);
    } else if (typeof input === 'number') {
      this.entropy = RootSeed.generateRandomEntropy(input);
      this.mnemonicSentence = RootSeed.convertEntropyToMnemonicSentence(this.entropy);
      this.seed = RootSeed.convertMnemonicSentenceToSeed(this.mnemonicSentence, rootSeedPassword);
    } else {
      throw new Error('First argument must be either a string (mnemonic sentence) or a number (entropy length)');
    }
    this.validate();
  }
  validate() {
    const entropyChecksum = RootSeed.calculateEntropyChecksum(this.entropy);
    const mnemonicSentenceChecksum = RootSeed.getMnemonicSentenceChecksum(this.mnemonicSentence);
    if (entropyChecksum.toString('hex') !== mnemonicSentenceChecksum.toString('hex')) {
      throw new Error('Mnemonic sentence is corrupted');
    }
  }
  static generateRandomEntropy(entropyLength) {
    if ([128, 160, 192, 224, 256].indexOf(entropyLength) === (-1)) {
      throw new Error('Entropy length must be either 128, 160, 192, 224 or 256');
    }
    return crypto.randomBytes(entropyLength / 8);
  }
  static decodeMnemonicSentence(mnemonicSentence) {
    const words = mnemonicSentence.split(' ');
    if ([12, 15, 18, 21, 24].indexOf(words.length) === (-1)) {
      throw new Error('Mnemonic sentence must contain only 12, 15, 18, 21 or 24 words');
    }
    const data = Buffer.alloc(((words.length * 4) / 3) + 4);
    const wordsToDecode = words.length;
    let quadWordIndex = 0;
    let quadWordNumber = 0;
    let wordsDecoded = 0;
    while (wordsDecoded < wordsToDecode) {
      const wordListIndex = wordList.indexOf(words[wordsDecoded]);
      if (wordListIndex === (-1)) {
        throw new Error('Mnemonic sentence must contain words only from the english wordlist');
      }
      const leftShifts = 32 - (((wordsDecoded + 1) * 11) % 32);
      if (leftShifts <= 21) {
        // eslint-disable-next-line no-restricted-properties
        quadWordNumber += (wordListIndex * Math.pow(2, leftShifts));
      } else {
        // eslint-disable-next-line no-restricted-properties
        quadWordNumber += Math.floor(wordListIndex / Math.pow(2, 32 - leftShifts));
        data.writeUInt32BE(quadWordNumber, quadWordIndex * 4);
        // eslint-disable-next-line no-restricted-properties
        quadWordNumber = (wordListIndex * Math.pow(2, leftShifts)) % 4294967296;
        quadWordIndex += 1;
      }
      wordsDecoded += 1;
    }
    data.writeUInt32BE(quadWordNumber, quadWordIndex * 4);
    const entropy = Buffer.alloc((words.length * 4) / 3);
    data.copy(entropy, 0, 0, entropy.length);
    return entropy;
  }
  static convertMnemonicSentenceToSeed(mnemonicSentence, password) {
    return crypto.pbkdf2Sync(Buffer.from(mnemonicSentence, 'utf8'), Buffer.from(`mnemonic${password.normalize('NFKD')}`, 'utf8'), 2048, 64, 'sha512');
  }
  static calculateEntropyChecksum(entropy) {
    const entropyHash = crypto.createHash('sha256').update(entropy).digest();
    const entropyChecksum = Buffer.alloc(1);
    /* eslint-disable no-restricted-properties */
    /* eslint-disable max-len */
    entropyChecksum.writeUInt8(Math.floor(entropyHash.readUInt8(0) / Math.pow(2, 8 - (entropy.length / 4))) * Math.pow(2, 8 - (entropy.length / 4)));
    /* eslint-enable no-restricted-properties */
    /* eslint-enable max-len */
    return entropyChecksum;
  }
  static encodeMnemonicSentence(data) {
    const paddedData = Buffer.concat([
      data,
      Buffer.alloc(2),
    ]);
    const bitsToEncode = (data.length * 8) - ((data.length * 8) % 11);
    let bitsEncoded = 0;
    const mnemonicWords = [];
    while (bitsEncoded < bitsToEncode) {
      /* eslint-disable no-restricted-properties */
      /* eslint-disable max-len */
      const wordListIndex = Math.floor(((paddedData.readUInt32BE(Math.floor(bitsEncoded / 8)) * Math.pow(2, bitsEncoded % 8)) % 4294967296) / 2097152);
      /* eslint-enable no-restricted-properties */
      /* eslint-enable max-len */
      mnemonicWords.push(wordList[wordListIndex]);
      bitsEncoded += 11;
    }
    return mnemonicWords.join(' ');
  }
  static convertEntropyToMnemonicSentence(entropy) {
    const entropyChecksum = RootSeed.calculateEntropyChecksum(entropy);
    const entropyWithChecksum = Buffer.concat([
      entropy,
      entropyChecksum,
    ]);
    return RootSeed.encodeMnemonicSentence(entropyWithChecksum);
  }
  static getMnemonicSentenceChecksum(mnemonicSentence) {
    const mnemonicWords = mnemonicSentence.split(' ');
    const mnemonicSentenceChecksum = Buffer.alloc(1);
    /* eslint-disable no-restricted-properties */
    /* eslint-disable max-len */
    mnemonicSentenceChecksum.writeUInt8((wordList.indexOf(mnemonicWords[mnemonicWords.length - 1]) * Math.pow(2, 8 - (mnemonicWords.length / 3))) % 256);
    /* eslint-enable no-restricted-properties */
    /* eslint-enable max-len */
    return mnemonicSentenceChecksum;
  }
}
module.exports = RootSeed;
