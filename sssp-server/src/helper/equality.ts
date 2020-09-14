/**
 * Helper functions to compare objects
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

/**
 * Equality with subset of properties
 * Subset of properties -> all properties from a
 * @param a
 * @param b
 */
export const subsetEqual = (a: object, b: object): boolean => {
    if(a === null && b === null) return true;
    if(a === null || b === null) return false;

    let aProps = Object.keys(a);
    
    for(let prop in aProps) {
        const aVal = a[prop];
        const bVal = b[prop];
        const areObjects = isObject(aVal) && isObject(bVal);
        if (
            areObjects && !deepEqual(aVal, bVal) || !areObjects && aVal !== bVal
        ) {
            return false;
        }
        else {
            return bVal !== aVal;
        }
    }
    return true
}

/**
 * Equality with recursion 1
 * @param a
 * @param b
 */
export const shallowEqual = (a: object, b: object): boolean => {
    if(a === null && b === null) return true;
    if(a === null || b === null) return false;

    let aProps = Object.keys(a);
    let bProps = Object.keys(b);

    if(aProps.length != bProps.length) {
        return false;
    }

    for(let prop in aProps) {
        if(a[prop] !== b[prop]) {
            return false;
        }
    }

    return true;
}

/**
 * Recursive equality
 * @param a
 * @param b
 */
export const deepEqual = (a: any, b: any): boolean => {
    if(a === null && b === null) return true;
    if(a === null || b === null) return false;

    if(a.hasOwnProperty('_doc')) {
        a = a._doc
        b = b._doc
    }

    const aProps = Object.keys(a);
    const bProps = Object.keys(b);

    if (aProps.length !== bProps.length) {

        return false;
    }

    for (const prop of aProps) {
        const aVal = a[prop];
        const bVal = b[prop];
        const areObjects = isObject(aVal) && isObject(bVal);
        if (
            areObjects && !deepEqual(aVal, bVal) || !areObjects && aVal !== bVal
        ) {
            return false;
        }
    }

    return true;
}

const isObject = (object: object): boolean => {
    return object != null && typeof object === 'object';
}
