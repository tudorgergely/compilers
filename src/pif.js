// @flow

/**
 * Entry for PIF.
 * Contains the symbolTable code and codification.
 */
export class PifEntry {
    stCode: number;
    codificationCode: number;

    constructor(stCode: number, codificationCode: number) {
        this.stCode = stCode;
        this.codificationCode = codificationCode;
    }
}

/**
 * The pif is an array of PifEntries.
 */
export type Pif = PifEntry[];