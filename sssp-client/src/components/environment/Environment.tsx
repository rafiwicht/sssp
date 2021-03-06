import React, {useEffect} from 'react';
import {useGetEnvironmentsLazyQuery} from '../../generated/graphql';
import EnvironmentList from "./EnvironmentList";
import EnvironmentForm from "./EnvironmentForm";

/**
 * Environment edit and view page
 */
const Environment: React.FC = () => {

    const [getEnvironments, {data, loading, error}] = useGetEnvironmentsLazyQuery();

    useEffect(() => {
        getEnvironments();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <EnvironmentList data={data.environments} />
            <EnvironmentForm />
        </div>
    );
}

export default Environment;