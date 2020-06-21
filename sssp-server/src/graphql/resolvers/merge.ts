/**
 * Transform functions for the types
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

const transformIdx = idx => {
    return {
        ...idx._doc,
        _id: idx.id
    };
};

export {transformIdx};
