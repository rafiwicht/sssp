# Test environment

To showcase the functionalities of the Splunk Self Service Portal, there is a test environment. At the moment, the test environment is only tested on linux. Before you can use it, you have to install some dependencies:

- `podman`
- `make`

The test environment is using [Podman](https://podman.io/), because on the newer versions of some linux distributions, Docker is no usable because it lacks CgroupS v2 compability. Neverless if you have to use docker, you can make it working with setting additional environment variables for the backend.

Addionally to the software, you also have to make an entry in your `/tec/hosts` file. The test environment is using self signed certificates for the URL `test.sssp.local`. If you run Podman on your local machine you have to add the URL to your locahost entry.

```
127.0.0.1   localhost localhost.localdomain test.sssp.local
```

After that, just run the following command:

```
make test-run
```

This take takes more than six minutes. There is a timeout in the Makefile, so does Gitlab can boot proper.

To remove the test environment use this command:

```
make test-stop
```

Keep in mind, you cannot use a test and a development environemnt at the same time.

After everything is up and running. You can access the software on [https://test.sssp.local:8000/](https://test.sssp.local:8000/). The test environment comes with default users. The default mongodb user and password can you get from the makefile. \
**This are hardcoded passphrases. Please do not use this in production!!**

<html>
<table>
    <thead>
        <tr>
            <th>Software</th>
            <th>Username</th>
            <th>Password</th>
            <th>Additional Information</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>LDAP only</td>
            <td>cn=admin,dc=rwicht,dc=ch</td>
            <td>admin</td>
            <td></td>
        </tr>
        <tr>
            <td rowspan=2>Systemwide using LDAP (Gitlab, Keycloak, SSSP)
            <td>test1</td>
            <td>Welcome.2020</td>
            <td>SSSP Admin User</td>
        </tr>
        <tr>
            <td>test2</td>
            <td>Welcome.2020</td>
            <td>SSSP Standard User</td>
        </tr>
        <tr>
            <td>Keycloak only</td>
            <td>root</td>
            <td>Welcome.2020</td>
            <td>For the keycloak admin interface</td>
        </tr>
        <tr>
            <td>Gitlab only</td>
            <td>root</td>
            <td>Welcome.2020</td>
            <td>Contains the repositories for the SSSP</td>
        </tr>
    </tbody>
</table>
</html>
