/**
 * Helper functions to compare objects
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
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
