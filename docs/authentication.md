# Authentication

A role mapping is used for authentication and authorization. When connecting an identity provider to Keycloak (e.g. Active Directory), the roles can be mapped automatically. The roles are then given in the token and read out by the backend. The services and the associated groups are then extracted from the roles using the following rule:

```
<PREFIX_LDAP_GROUPS><servicename>_<user|power>
```

`PREFIX_LDAP_GROUPS` is an environment variable that can be set. The default is 'svc_'. 'user' meant read permissions and'power' read and write permissions.
