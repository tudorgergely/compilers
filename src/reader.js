// @flow

import fs from 'fs';

/**
 * Reads from file as string. Returns result in promise.
 * @param fileName - the file to read.
 * @returns {Promise} - Resolves with the text from the file.
 *                    - Rejects with the error from fs.
 */
export function readString(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'UTF-8', (e, s) => {
            if (e) {
                reject(e);
            } else {
                resolve(s);
            }
        });
    });
}

/**
 * Reads from file a JSON. Returns result in promise.
 * @param fileName - the file to read.
 * @returns {Promise} - Resolves with the object from the file.
 *                    - Rejects with the error from fs.
 */
export function readObject(fileName: string): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'UTF-8', (e, s) => {
            if (e) {
                reject(e);
            } else {
                resolve(JSON.parse(s));
            }
        });
    });
}
