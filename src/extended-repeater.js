const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let repeatTimes = options.repeatTimes || 1;
  let separator = options.separator || '+';
  let addition = String(options.addition) || '';
  let additionRepeatTimes = options.additionRepeatTimes || 1;
  let additionSeparator = options.additionSeparator || '|';

  let newStr = [];

  if(typeof(str) != 'String') str = String(str);

  let substr = str + (addition != 'undefined' ? addition + additionSeparator : '' + additionSeparator).repeat(additionRepeatTimes);
  substr = substr.slice(0, substr.length - additionSeparator.length)
  
  for (let i = 0; i < repeatTimes; i++) {
    newStr.push(substr)
  }

  return newStr.join(separator)
}

module.exports = {
  repeater
};
