const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  encrypt(message, key) {
    if(!message || !key) {
      throw new Error('Incorrect arguments!')
    }

    let arr = [];
    let encodeArr = [];
    let result = '';
    let regexp = /[^a-zA-Z]/g;
    let regexp1 = /^[a-zA-Z]+$/i;
    let ind = 0;
    let sortMessage = message.replace(regexp, '').toUpperCase();
    let maxLength = Math.max(key.length, sortMessage.length);

    for(let i = 0; i< maxLength; i++) {
      let k = this.alphabet.indexOf(key[(i >= key.length) ? i % key.length : i].toUpperCase());
      let m = this.alphabet.indexOf(sortMessage[(i >= sortMessage.length) ? i % sortMessage.length : i]);
      
      arr.push((m + k)%26);
      
      this.alphabet.split('').forEach(element => {
        if(arr[i] === this.alphabet.indexOf(element)) {
          encodeArr.push(element);
        }
      });
    }

    for(let i = 0; i < message.length; i++) {
      if(!regexp.test(message[i])) {
        result += message[i].replace(regexp1, encodeArr[ind]);
        ind++;
      } else {
        result+= message[i];
      }
    }
    return this.direct ? result : result.split('').reverse().join('')
  }

  decrypt(encryptedMessage, key) {
    if(!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    let arr = []
    let encodeArr = []
    let result = '';
    let regexp = /[^a-zA-Z]/g
    let regexp1 = /^[a-zA-Z]+$/i
    let ind = 0
    let sortEncryptedMessage =encryptedMessage.replace(regexp, '')
    let maxLength = Math.max(key.length, sortEncryptedMessage.length)

    for(let i = 0; i< maxLength; i++) {
      let k = this.alphabet.indexOf(key[(i>=key.length) ? i%key.length : i].toUpperCase());
      let m = this.alphabet.indexOf(sortEncryptedMessage[(i >= sortEncryptedMessage.length) ? i%sortEncryptedMessage.length : i])
      
      arr.push((m - k) < 0 ? (m - k) + 26 : (m - k))
    
      this.alphabet.split('').forEach(element => {
        if(arr[i] === this.alphabet.indexOf(element)) {
          encodeArr.push(element)
        }
      });
    }

    for(let i = 0; i < encryptedMessage.length; i++) {
      if(!regexp.test(encryptedMessage[i])) {
        result += encryptedMessage[i].replace(regexp1, encodeArr[ind])
        ind++
      } else {
        result+= encryptedMessage[i]
      }
    }

    return this.direct ? result : result.split('').reverse().join('')
  }
}

module.exports = {
  VigenereCipheringMachine
};
