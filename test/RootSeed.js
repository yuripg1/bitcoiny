const assert = require('assert');
const RootSeed = require('../lib/RootSeed');

describe('[RootSeed] Random root seed generation', () => {
  it('From 256 bit entropy / Without password', () => {
    const rootSeed = new RootSeed(256);
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 32);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 24);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 256 bit entropy / With password', () => {
    const rootSeed = new RootSeed(256, 'password1');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 32);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 24);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 224 bit entropy / Without password', () => {
    const rootSeed = new RootSeed(224);
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 28);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 21);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 224 bit entropy / With password', () => {
    const rootSeed = new RootSeed(224, 'password2');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 28);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 21);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 192 bit entropy / Without password', () => {
    const rootSeed = new RootSeed(192);
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 24);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 18);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 192 bit entropy / With password', () => {
    const rootSeed = new RootSeed(192, 'password3');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 24);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 18);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 160 bit entropy / Without password', () => {
    const rootSeed = new RootSeed(160);
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 20);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 15);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 160 bit entropy / With password', () => {
    const rootSeed = new RootSeed(160, 'password4');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 20);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 15);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 128 bit entropy / Without password', () => {
    const rootSeed = new RootSeed(128);
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 16);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 12);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
  it('From 128 bit entropy / With password', () => {
    const rootSeed = new RootSeed(128, 'password5');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.length, 16);
    assert.strictEqual(typeof rootSeed.mnemonicSentence, 'string');
    assert.strictEqual(rootSeed.mnemonicSentence.split(' ').length, 12);
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.length, 64);
  });
});
describe('[RootSeed] Root seed loading', () => {
  it('From 24 words mnemonic sentence / Without password', () => {
    const rootSeed = new RootSeed('protect canoe globe prevent rule angle hill spot rack tomorrow cheap fire kite relief faith rocket seek wonder charge unhappy under congress start brick');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), 'aca4318d552bd2119aee96b09c849bab97b36a9485dbc31fa09a76aecc5e3528');
    assert.strictEqual(rootSeed.mnemonicSentence, 'protect canoe globe prevent rule angle hill spot rack tomorrow cheap fire kite relief faith rocket seek wonder charge unhappy under congress start brick');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), 'a2bf4321dd99b58c996f060c23d5584865d96d1d836944d043c537a546546663d2748a601c8df3577ff5752dcd92496893edc14246732b930f080685ef0ecc25');
  });
  it('From 24 words mnemonic sentence / With password', () => {
    const rootSeed = new RootSeed('blade help coffee predict pride puzzle small admit price evoke believe because staff guard erupt amateur frozen shift axis lucky wink waste wisdom mechanic', 'password6');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '170d60b4d4daa95df3181daa69c05289ed40ce93383d5db8b843c25fbdef7f14');
    assert.strictEqual(rootSeed.mnemonicSentence, 'blade help coffee predict pride puzzle small admit price evoke believe because staff guard erupt amateur frozen shift axis lucky wink waste wisdom mechanic');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), 'f2cabc07c15edde0f6c22323159fb89213cc0b7bc2c02d771ed531f1fda72bafbc7476d63feb83f328a5e0d35096e3081289d9d56a7924eda8461385157f221a');
  });
  it('From 21 words mnemonic sentence / Without password', () => {
    const rootSeed = new RootSeed('atom illegal title library plug dial drama spot height despair antenna side garden profit caught junk citizen differ enforce develop ostrich');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '0e4e238bc08a6c7a108e966aa7802763f5fb57891bca2947b9289e49');
    assert.strictEqual(rootSeed.mnemonicSentence, 'atom illegal title library plug dial drama spot height despair antenna side garden profit caught junk citizen differ enforce develop ostrich');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '711588bf80eb4be71448486c0106b86dbc37772392e293da5737356a37d3ac8fce74bb2335e1b312822e89019f25ee48589e45cddd3fb71b00cad036b8c8ddf0');
  });
  it('From 21 words mnemonic sentence / With password', () => {
    const rootSeed = new RootSeed('exhibit worry tribe exit combine mandate symptom corn dolphin muffin valid menu satoshi sun lonely february margin quantum slim tower chest', 'password7');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '4f9fbba127f2df0e37218340d227c3459bf7b2a0eaa287f5eb2f7312');
    assert.strictEqual(rootSeed.mnemonicSentence, 'exhibit worry tribe exit combine mandate symptom corn dolphin muffin valid menu satoshi sun lonely february margin quantum slim tower chest');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '6fb660cba9a8788095804b7751cb21cf91ecf3b1b1ee19faa1b65317314021eee7321171d97b628239d3b84d06913cc5730076b699ad928355c5f4e874788807');
  });
  it('From 18 words mnemonic sentence / Without password', () => {
    const rootSeed = new RootSeed('during soul swallow claw airport boss holiday blood embrace abstract run early blast tourist sunny head abandon praise');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '4439f76c150058345b30bf48801ef5229177cbf65b500015');
    assert.strictEqual(rootSeed.mnemonicSentence, 'during soul swallow claw airport boss holiday blood embrace abstract run early blast tourist sunny head abandon praise');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '66187f3094191fbd6f62b1e8e81e50003d73ae866d4696f6b48373c3150c8dec258138bb6f4c3601b83a6d0d3e522399a516befdb2329bd52c90baec989c40ec');
  });
  it('From 18 words mnemonic sentence / With password', () => {
    const rootSeed = new RootSeed('right proud strong present note lobster teach infant pioneer trim power miracle ketchup radar craft door whale gate', 'password8');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), 'b9d59b5cd5096b0677a39aa53d16a546b79f614c820bf9ac');
    assert.strictEqual(rootSeed.mnemonicSentence, 'right proud strong present note lobster teach infant pioneer trim power miracle ketchup radar craft door whale gate');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '9f89de31c59dd37ba8674abadbc74cddcde9840bd2b1fea479c4327c67322d9d3c47025f6ccb94d7419498e97e9b502e5ad53f199b9a533b90b2e787327ae715');
  });
  it('From 15 words mnemonic sentence / Without password', () => {
    const rootSeed = new RootSeed('lunch west toast lake quick image donkey can prepare frown civil staff patch kidney paper');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '853f2f8c3e5afae2904907a9ebb0a66a0a0cf4e7');
    assert.strictEqual(rootSeed.mnemonicSentence, 'lunch west toast lake quick image donkey can prepare frown civil staff patch kidney paper');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), 'be054fad85b8ab8ee58af4a2755e15f709ee8ec223b34dc41c7670aec437a34c7ee4409380864a6b7d486e175d52d3b5b5d81d570e3a816ebb75caddfa1c4fca');
  });
  it('From 15 words mnemonic sentence / With password', () => {
    const rootSeed = new RootSeed('fiber dose hobby friend cover divide enroll mystery defy cruel foster behave jelly umbrella drop', 'password9');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '55a831b12e73187fd2cc9339a691700a377dd850');
    assert.strictEqual(rootSeed.mnemonicSentence, 'fiber dose hobby friend cover divide enroll mystery defy cruel foster behave jelly umbrella drop');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '9ef0386bd11c47495ffa9e74fbd55f82d5af8b8e1c39337b5e52fb91ca57e6007321532eeb3d6113eb9d82c3161ec3bb59792d95639bda7b6c1014c936ed43b2');
  });
  it('From 12 words mnemonic sentence / Without password', () => {
    const rootSeed = new RootSeed('ceiling border puzzle mirror animal drift puppy climb decade flock carpet upset');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '24e33abbc6c09085ab8158388b288b77');
    assert.strictEqual(rootSeed.mnemonicSentence, 'ceiling border puzzle mirror animal drift puppy climb decade flock carpet upset');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '2329d884afd13c82bd951bc0a382964f469d2dc4aeaeee6c4f8ffb46635ace25b4a49f5edefee10fef794306055ec5adf79a551b158814fae432c3c5e3846b72');
  });
  it('From 12 words mnemonic sentence / With password', () => {
    const rootSeed = new RootSeed('can dose manual raven ranch short morning galaxy foster jar plunge betray', 'password10');
    assert.strictEqual(typeof rootSeed, 'object');
    assert.strictEqual(rootSeed instanceof RootSeed, true);
    assert.strictEqual(typeof rootSeed.entropy, 'object');
    assert.strictEqual(rootSeed.entropy instanceof Buffer, true);
    assert.strictEqual(rootSeed.entropy.toString('hex'), '20e8321dd93b198da3faf75c0eea9b8a');
    assert.strictEqual(rootSeed.mnemonicSentence, 'can dose manual raven ranch short morning galaxy foster jar plunge betray');
    assert.strictEqual(typeof rootSeed.seed, 'object');
    assert.strictEqual(rootSeed.seed instanceof Buffer, true);
    assert.strictEqual(rootSeed.seed.toString('hex'), '4be26f5c72d3fd5a591e7e31c9c1d7dd30e963408fb89231461856cfdf555d948114094be2239583c3b6aa541a856959cff8137f711b78ade46c02130ad33d23');
  });
});
describe('[RootSeed] Invalid arguments', () => {
  it('No first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed();
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'First argument must be either a string (mnemonic sentence) or a number (entropy length)');
  });
  it('Null first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(null);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'First argument must be either a string (mnemonic sentence) or a number (entropy length)');
  });
  it('Boolean first argument', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(true);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'First argument must be either a string (mnemonic sentence) or a number (entropy length)');
  });
  it('Null password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(256, null);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Password must be a string');
  });
  it('Number password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(224, 963655918);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Password must be a string');
  });
  it('Boolean password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(192, true);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Password must be a string');
  });
  it('Invalid entropy length', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed(255);
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Entropy length must be either 128, 160, 192, 224 or 256');
  });
  it('Mnemonic sentence containing invalid number of words', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('ceiling border mirror animal drift puppy climb decade flock carpet upset');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence must contain only 12, 15, 18, 21 or 24 words');
  });
  it('Mnemonic sentence containing invalid word', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('ceiling border puzzle mirror animal invalid puppy climb decade flock carpet upset');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence must contain words only from the english wordlist');
  });
  it('Corrupted 24 words mnemonic sentence / without password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('protect canoe globe price rule angle hill spot rack tomorrow cheap fire kite relief faith rocket seek wonder charge unhappy under congress start brick');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 24 words mnemonic sentence / with password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('blade help coffee predict pride puzzle small admit price evoke believe because staff guard erupt amateur frozen shift axis lucky wink waste wisdom meat', 'password6');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 21 words mnemonic sentence / without password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('atom illegal title library plug dial drama spot height despair antenna side garden profit caught junk citizen differ enforce develop orphan');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 21 words mnemonic sentence / with password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('exile worry tribe exit combine mandate symptom corn dolphin muffin valid menu satoshi sun lonely february margin quantum slim tower chest', 'password7');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 18 words mnemonic sentence / without password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('during soul swallow claw airport boss holiday blood embrace abstract run eagle blast tourist sunny head abandon praise');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 18 words mnemonic sentence / with password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('right proud strong present note lobster teach infant pioneer trim power miracle ketchup radar craft door whale gather', 'password8');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 15 words mnemonic sentence / without password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('lunch west toast lake quick image donkey can prepare frown civil staff patch kidney parade');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 15 words mnemonic sentence / with password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('few dose hobby friend cover divide enroll mystery defy cruel foster behave jelly umbrella drop', 'password9');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 12 words mnemonic sentence / without password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('ceiling border puzzle mirror animal drift puppy climb debris flock carpet upset');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
  it('Corrupted 12 words mnemonic sentence / with password', () => {
    let exceptionMessage;
    try {
      // eslint-disable-next-line no-new
      new RootSeed('can dose manual raven ranch short morning galaxy foster jar plunge best', 'password10');
    } catch (e) {
      exceptionMessage = e.message;
    }
    assert.strictEqual(exceptionMessage, 'Mnemonic sentence is corrupted');
  });
});
