# Devlopment environment

The dependencies are the same as in the build image section. The rest is nearly the same as in the test environment section. The only difference are the commands used to start and stop the environment. 

```
make dev-run
make dev-stop
```

Just keep in mind, if you do not use all the containers, just start them independently using:

```
make def-<name of component>
```

When all servers are up, you can just make your changes in the `sssp-client` and `sssp-server` folder. Both directory are mounted in the container. When any changes are detected the deamons in the containers will automatically restart. Thanks to hot reload, the changes are directly visible in the frontend and you do not have to reload the page :).

There is a possible issue, with the `sssp-server` container. Nodemon can only watch a certain number of files. Because of the node modules, this number has been exceeded. The number can be increased permanently with the following command:

```
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

After this, restart the container:

```
make dev-refresh-server
```
