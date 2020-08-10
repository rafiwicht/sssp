import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSourcetypeLazyQuery } from '../../generated/graphql';


type SourcetypeHelperParams = {
    serviceId: string,
    sourcetypeId: string
}

const SourcetypeHelper: React.FC = () => {
    const {serviceId, sourcetypeId}: SourcetypeHelperParams = useParams();

    const [getSourcetype, {data, error, loading}] = useGetSourcetypeLazyQuery({
        variables: {
            serviceId: serviceId,
            sourcetypeId: sourcetypeId
        }
    })

    useEffect(()=> {
        getSourcetype();
    },[])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    console.log(data);

    return (
        <div>Test</div>
    );
}

export default SourcetypeHelper;