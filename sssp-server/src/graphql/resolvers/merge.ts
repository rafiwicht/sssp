/**
 * Transform functions for the types
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

const transformService = service => {
    return {
        ...service._doc,
        _id: service.id
    };
};

const transformSourcetype = sourcetype => {
    return {
        ...sourcetype._doc,
        _id: sourcetype.id
    };
};

export {transformService, transformSourcetype};
