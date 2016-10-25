// @flow

/**
 * Type of validation function used to validate some regex.
 * Will take the string token and returns a boolean
 */
export type ValidatorFn = (text: string) => boolean;

/**
 * A rule for the scanner.
 * It contains the RegExp, the type of the rule and a validationFn.
 */
export class Rule {
    regex: RegExp;
    type: string;
    validatorFn: ?ValidatorFn;

    constructor(regex: RegExp, validatorFn: ValidatorFn, type: string) {
        this.regex = regex;
        this.type = type;
        this.validatorFn = validatorFn;
    }
}
