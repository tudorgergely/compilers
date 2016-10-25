// @flow

import {Rule} from "./rule";

/**
 * Returns first match in text based on the given rules.
 *
 * @param text - the text to search
 * @param rules - the list of rules to match the text for
 * @returns Match - the first match which was found.
 * @throws Token not valid error.
 */
export function findMatch(text: string, rules: Rule[]): Match {
    const matches = rules
        .map(rule => [rule, rule.regex.exec(text)])
        .filter(([rule, match]) => match && match.index === 0);

    if (matches.length < 1) {
        throw(`${text.slice(0, 50).replace(/\n/g, ' ')}
^ is not a valid token`);
    }
    const [rule, match] = matches[0];

    return {rule, token: match[0]};
}

export type Match = {
    rule: Rule,
    token: string
}