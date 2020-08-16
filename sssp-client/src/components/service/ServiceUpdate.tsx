import React, {useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {
    GetServiceDocument,
    GetServicesDocument, Index,
    ServiceInput, useGetServiceLazyQuery,
    useUpdateServiceMutation
} from "../../generated/graphql";
import ServiceMod from "./ServiceMod";

type ServiceUpdateParams = {
    id: string
}

const ServiceUpdate: React.FC = () => {
    const { id }: ServiceUpdateParams = useParams();

    let history = useHistory();

    const [updateService] = useUpdateServiceMutation({
        refetchQueries: [{
            query: GetServicesDocument
        }, {
            query: GetServiceDocument,
            variables: {
                serviceId: id
            }
        }]
    });

    const [getService, {data, error, loading}] = useGetServiceLazyQuery({
        variables: {
            serviceId: id
        }
    });

    const handleSubmit = (serviceInput: ServiceInput) => {
        updateService({
            variables: {
                serviceId: id,
                serviceInput: serviceInput
            }
        }).then(() => {
                history.push('/service')
        });
    }

    useEffect(() => {
        getService();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <ServiceMod
                handleSubmit={handleSubmit}
                serviceMod={{
                    name: data.service.name,
                    owner: data.service.owner,
                    indexes: data.service.indexes.map((e : Index) => {
                        return {
                            name: e.name,
                            maxTotalDataSizeMB: e.maxTotalDataSizeMB,
                            frozenTimePeriodInSecs: e.frozenTimePeriodInSecs
                        }
                    }),
                    apps: data.service.apps.map((e) => {
                       return {
                           name: e.name,
                           type: e.type
                       }
                    }),
                    read: data.service.read,
                    write: data.service.write
                }}
            />
        </div>
    );
}
export default ServiceUpdate;