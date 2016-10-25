// @flow

/**
 * Interface used for Tree. Needed so elements can be compared.
 */
export interface Comparable {
    lt(t: any): boolean,
    gt(t: any): boolean,
    eq(t: any): boolean
}

/**
 * A tree is a tuple with a Node, a left branch and a right branch.
 */
export type Tree = [?Tree, Comparable, ?Tree];

/**
 * Checks is value is in tree.
 * @param tree - the tree to search into.
 * @param value - the value to search for.
 * @returns {boolean} - true if value is in tree; false otherwise
 */
export function contains(tree: ?Tree, value: Comparable): boolean {
    if (!tree) return false;
    const [leftBranch, root, rightBranch] = tree;
    if (value.eq(root)) {
        return true;
    } else if (value.lt(root)) {
        return contains(leftBranch, value);
    } else {
        return contains(rightBranch, value);
    }
}

/**
 * Finds the first value which is equal to value.
 * @param tree - the tree to search into
 * @param value - the value to search for
 * @returns {*} - the found value from tree
 */
export function findInTree(tree: ?Tree, value: Comparable): ?Comparable {
    if (!tree) return null;
    const [leftBranch, root, rightBranch] = tree;
    if (value.eq(root)) {
        return root;
    } else if (value.lt(root)) {
        return findInTree(leftBranch, value);
    } else {
        return findInTree(rightBranch, value);
    }
}

/**
 * Takes a tree and a value and computes a new tree from the given one.
 * The returned tree will also have the given value.
 * @param tree - the tree to "insert" into
 * @param value - the value to be inserted
 * @returns {*} - new tree containing the value
 */
export function insertInTree(tree: ?Tree, value: Comparable): Tree {
    if (!tree) return [null, value, null];
    const [leftBranch, root, rightBranch] = tree;
    if (value.lt(root)) {
        return [
            insertInTree(leftBranch, value),
            root,
            rightBranch
        ];
    } else if (value.gt(root)) {
        return [
            leftBranch,
            root,
            insertInTree(rightBranch, value)
        ];
    } else {
        return tree;
    }
}

/**
 * Takes a tree and a value and computes a new tree from the given one.
 * The returned tree will no longer have the given value.
 * @param tree - the tree to "remove" from
 * @param value - the value to be removed
 * @returns {*} - new tree without the value
 */
export function removeInTree(tree: ?Tree, value: Comparable): ?Tree {
    if (!tree) return null;
    const [leftBranch, root, rightBranch] = tree;
    if (value.lt(root)) {
        return [
            removeInTree(leftBranch, value),
            root,
            rightBranch
        ];
    } else if (value.gt(root)) {
        return [
            leftBranch,
            root,
            removeInTree(rightBranch, value)
        ];
    } else {
        return deleteRootInTree(tree);
    }
}

/**
 * Takes a tree and returns a new one with root null.
 * @param tree - the tree to removed the root from
 * @returns {*} - new tree without the root.
 */
function deleteRootInTree(tree: ?Tree): ?Tree {
    if (!tree) return null;
    const [leftBranch,, rightBranch] = tree;
    if (!leftBranch) {
        return rightBranch;
    } else if (!rightBranch) {
        return leftBranch;
    } else {
        return [
            leftBranch,
            leftestElement(rightBranch),
            rightBranch
        ];
    }
}

/**
 * Finds the leftest element in tree.
 * @param tree - the tree to search into
 * @returns {Comparable} - value found or null;
 */
function leftestElement(tree: Tree): Comparable {
    const [leftBranch, root,] = tree;
    if (!leftBranch) {
        return root;
    } else {
        return leftestElement(leftBranch);
    }
}