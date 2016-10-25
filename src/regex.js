/**
 * May be contain letters and numbers but has to start with a letter
 * @type {RegExp}
 */
export const IDENTIFIER = /([a-zA-Z][a-zA-Z0-9]*)/;

/**
 * Checks for all operators. Precendence is considered for ==, <=, >= to function properly
 * @type {RegExp}
 */
export const OPERATOR = /\+|\*|-|\/|==|>=|=|<=|<|>|!=|&&|\|\|/;

/**
 * Checks for all separators
 * @type {RegExp}
 */
export const SEPARATOR = /\[|\]|\{|\}|\(|\)| |\n/;

/**
 * Checks for all reserved words
 * @type {RegExp}
 */
export const RESERVED_WORD = /(if|else|while|read|print|int|bool|char|string)\b/;

/**
 * The four types in our language
 * @type {RegExp}
 */
export const TYPE = /(int|bool|char|string)$/;

/**
 * Constants can either be:
 * a number (0 or non-zero-starting number),
 * a string of multiple (or none) letters,
 * a char of one (or none) letter.
 * @type {RegExp}
 */
export const CONSTANT = /0|[1-9][0-9]*|"[a-zA-Z]*"|'[a-zA-Z]'/;

