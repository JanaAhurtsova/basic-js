const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    let link = `( ${value} )`;
    this.chain.push(link)
    return this
  },
  removeLink(position) {
    if(typeof(position) == 'number' && position >= 1 && Number.isInteger(position) && position < this.getLength()) {
      this.chain.splice(position - 1, 1);
    } else {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }
    return this
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const res = this.chain.join('~~');
    this.chain = [];
    return res
  }
};

module.exports = {
  chainMaker
};
