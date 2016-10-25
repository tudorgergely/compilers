// @flow

import {insertInTree, findInTree, contains} from './tree';
import {SymbolTableEntry} from './symbol-table';
import type {SymbolTable} from './symbol-table';
import {Rule} from './rule';
import {PifEntry} from './pif';
import type {Pif} from './pif';
import {findMatch} from './match';

type Codification = {
    name: string,
    code: number
}

/**
 * Scans a text by some rules. Returns PIF and ST as a tuple.
 * @param text - the text to scan.
 * @param rules - the rules to use for scanning.
 * @param codifications - codes used for codification
 * @param symbolTable - initial symbol table
 * @param pif - initial pif
 * @returns {*}
 */
export function scan(text: string,
                     rules: Rule[],
                     codifications: Codification[],
                     symbolTable: SymbolTable = null,
                     pif: Pif = []): [SymbolTable, Pif] {
    if (text.length === 0) {
        return [symbolTable, pif];
    }
    let codificationCode;
    let st = symbolTable;
    let pf = pif;
    const {token, rule} = findMatch(text, rules);
    switch (rule.type) {
        case 'IDENTIFIER':
        case 'CONSTANT':
            codificationCode = codifications
                .find(codif => codif.name === rule.type.toLowerCase())
                .code;
            let entry = new SymbolTableEntry(token, 0);
            if (contains(symbolTable, entry)) {
                entry = findInTree(symbolTable, entry);
                pf = [...pif, new PifEntry(entry.code, codificationCode)];
            } else {
                let code = Math.floor(Math.random() * 1000);
                st = insertInTree(symbolTable, new SymbolTableEntry(token, code));
                pf = [...pif, new PifEntry(code, codificationCode)];
            }
            break;
        default:
            codificationCode = codifications.find(codif => codif.name === token).code;
            pf = [...pif, new PifEntry(-1, codificationCode)];
    }
    return scan(text.slice(token.length), rules, codifications, st, pf);
}
