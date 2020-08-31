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
