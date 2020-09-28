/**
 * Loader for keycloak public key
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


import axios from 'axios';
import config from "./index";

class KeycloakValidate {
    private publicKey: string;

    constructor() {
        this.publicKey = '';
    }

    private async init() {
        axios.get(config.jwtCertUrl)
            .then(response => {
                this.publicKey = response.data.keys[0].x5c[0];
            })
            .catch(() => {
                throw new Error('Key could not get loaded!');
            });
    }

    public publicFile () {
        if(this.publicKey == '') {
            this.init()
        }
        return `-----BEGIN CERTIFICATE-----
${this.publicKey}
-----END CERTIFICATE----- 
`;
    }

}

export default new KeycloakValidate();
