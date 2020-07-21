import {useKeycloak} from "@react-keycloak/web";
import {useIsAdminQuery} from "../generated/graphql";

const useAdmin = () => {
    /*
    const [keycloak] = useKeycloak();
    if(keycloak.tokenParsed) {
        const parsed: any = keycloak.tokenParsed;
        try {
            const {data, loading, error} = useIsAdminQuery({
                variables:{
                    userId: parsed.preferred_username
                }
            });

            console.log(1);
            if(data) {
                return data.admin;
            }
        } catch (error) {
            return false;
        }
    }*/
    return false;
}
export default useAdmin;