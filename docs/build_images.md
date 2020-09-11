# Build Images

This section describes, how the images can be build using the makefile. If you cannot or do not want to use the makefile, with small changes you can also do it manually.

## Dependencies

To build the images using the makefile you need the follow software:

- `podman`
- `make`
- `node`
- `yarn` (either directly from the website or using `npm i -g yarn`, after node is installed)

## Client 

For production, you have to build the image for yourself. The reason is, that you cannot set the environment variabels in react at runtime. You have to set them during the build. The docker image [docker.io/wichtr/sssp-client](https://hub.docker.com/r/wichtr/sssp-client) is only usable for the test environment.

Before you can build the image, you have to create the file `sssp-client/.envProd`. In this file, you can add the environment variables for the build.

**Description of the `.envProd` file:**

|Name|Description|Default value|
|---|---|---|
| FIRM |A short name of the firm. Used in the name of the apps/addons. | SSSP | 
| ADMIN_ROLE | The LDAP role for the SSSP Admins | sssp-admin | 
| KEYCLOAK_URL | URL to the keycloak backend. | https://test.sssp.local:8000/auth/ | 
| KEYCLOAK_REALM | The keycloak realm used for the SSSP | sssp | 
| KEYCLOAK_CLIENT_ID | The keycloak client for the SSSP | sssp-client |

```
make build-client
make build-client CLIENT_IMG=<own name> VERSION=<own version>
```

The build commands create by default two images: `docker.io/wichtr/sssp-client:<current version>` and `docker.io/wichtr/sssp-client:latest`. You can override both variables with your own values.

## Server

For production you can use the prebuild image [docker.io/wichtr/sssp-server](https://hub.docker.com/r/wichtr/sssp-server). For production, you can set the environment variables in the container:

|Name|Description|Default value|
|---|---|---|
| PORT | The port for the server application | 5000 |
| MONGO_USER | The user used for mongodb | (no default) |
| MONGO_SECRET | The passphrase of the mongodb user | (no default) |
| MONGO | The server adress of the mongodb instance | (no default) |
| MONGO_PORT | The port of the mongodb instance | 27017 |
| ADMIN_ROLE | The LDAP-group with the sssp admins | sssp-admin |
| PREFIX_LDAP_GROUPS | Prefix of the AD groups `<praefix><servicename>_<user|power>` | "svc_" |
| JWT_CERT_URL | The URL, where the public certificate can be downloaded | http://127.0.0.1:8080/auth/realms/sssp/protocol/openid-connect/certs |
| GITHUB_TOKEN | Token for token-based authentication, if set Github will be used | (no default) |
| GITHUB_ORG | The github organization where the repositories are created | sssp-test |
| GITLAB_TOKEN | Token for token-based authentication, if set Gitlab will be used | (no default) |
| GITLAB_USER | The Gitlab user who owns all repositories | root |
| GITLAB_PUB_URL | The public url of Github, does not have to be the same as API | GITLAB_URL -> http://test.sssp.local:7080 |
| MAX_TOTAL_DATA_SIZE_MB | Splunk index default | 100000000 |
| FROZEN_TIME_PERION_IN_SECONDS | Splunk index default | 7776000 |

You can also build the images using the makefile.
```
make build-server
make build-server SERVER_IMG=<own name> VERSION=<own version>
```