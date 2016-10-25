// @flow

import {scan} from "./scanner";
import {RESERVED_WORD, SEPARATOR, OPERATOR, IDENTIFIER, CONSTANT} from "./regex";
import {readString, readObject} from "./reader";
import {Rule} from "./rule";

/**
 * Read the program from 'program.src'.
 * Read codifications from 'codification.json'
 *
 * Use scanner function to extract PIF and ST.
 * Log PIF and ST to console.
 *
 * In case of error print it to error.
 */
Promise.all([readString('program.src'), readObject('codification.json')])
    .then(([program, codifications]) => scan(program, createRules(), codifications))
    .then(([symbolTable, pif]) => {
        console.log('\n\n symbol table: \n\n', JSON.stringify(symbolTable, null, 2));
        console.log('\n\n pif: \n\n', JSON.stringify(pif, null, 2))
    })
    .catch(console.error.bind(console));

/**
 * Creates the rule objects necessary for matching the program
 * @returns {[*,*,*,*,*]}
 */
function createRules(): Rule[] {
    return [
        new Rule(OPERATOR, () => true, 'OPERATOR'),
        new Rule(RESERVED_WORD, () => true, 'RESERVED_WORD'),
        new Rule(SEPARATOR, () => true, 'SEPARATOR'),
        new Rule(CONSTANT, () => true, 'CONSTANT'),
        new Rule(IDENTIFIER, text => text.length <= 8, 'IDENTIFIER'),
    ];
}
