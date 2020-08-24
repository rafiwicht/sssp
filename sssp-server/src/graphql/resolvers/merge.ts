/**
 * Transform functions for the types
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


enum Kind {
    CURRENT= 'CURRENT',
    FUTURE = 'FUTURE'
}

const transformService = (service, kind = Kind.FUTURE) => {
    let document;
    if(kind === Kind.CURRENT || service._doc.futureService === null) {
        document = service._doc;
    }
    else {
        document = service._doc.futureService._doc;
        document.state = service._doc.state;
        document._id = service._id;
    }
    return document;
};

export {transformService, Kind};
