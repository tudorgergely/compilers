// @flow

import type {Tree} from "./tree";

/**
 * SymbolTable is just a Tree which can be null.
 */
export type SymbolTable = ?Tree;

/**
 * Entry in the symbolTable.
 *
 * Must have lt, gt and eq methods for the Tree.
 */
export class SymbolTableEntry {
    name: string;
    code: number;

    constructor(name: string, code: number) {
        this.name = name;
        this.code = code;
    }

    lt(entry: SymbolTableEntry): boolean {
        return this.name < entry.name;
    }

    gt(entry: SymbolTableEntry): boolean {
        return this.name > entry.name;
    }

    eq(entry: SymbolTableEntry): boolean {
        return this.name === entry.name;
    }
}