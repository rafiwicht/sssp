# Used docker image
include .env

NODE_IMG ?= registry.access.redhat.com/ubi8/nodejs-12
NGINX_IMG ?= nginx
MONGO_IMG ?= mongo
SERVER ?= sssp-server
CLIENT ?= sssp-client
MONGO ?= sssp-mongo
PROXY ?= sssp-proxy
IP := $(shell hostname -I | cut -d' ' -f1)

############## Local run ##############

run: mongo server client proxy

remove: rm-proxy rm-server rm-mongo rm-client

refresh: remove run

clean:
	-podman kill -a
	-podman rm -a
	-rm -rf /tmp/sssp-proxy/

proxy:
	sleep 20
	mkdir /tmp/sssp-proxy/
	sed s/IP/${IP}/g ./sssp-dev-proxy/sssp.conf >> /tmp/sssp-proxy/sssp.conf
	podman run -dt -p 8080:8080/tcp -v /tmp/sssp-proxy/:/etc/nginx/conf.d/ --name ${PROXY} ${NGINX_IMG}

server:
	sleep 10
	cd sssp-server
	yarn
	cd ..
	podman run -dt \
		-p 5000:5000/tcp \
		--env DEV_MODE=true \
		--env MONGO_USER=${MONGO_USER} \
		--env MONGO_SECRET=${MONGO_SECRET} \
		--env MONGO=${IP} \
		--env JWT_SECRET=${JWT_SECRET} \
		-v ./sssp-server/:/opt/app-root/ \
		--name ${SERVER} \
		${NODE_IMG} \
		npx ts-node server.ts

client:
	cd sssp-client
	yarn
	cd ..
	podman run -itd \
		-p 3000:3000/tcp \
		--env DEV_MODE=true \
		-v ./sssp-client/:/opt/app-root/ \
		--name ${CLIENT} \
		${NODE_IMG} \
		npm start
mongo:
	podman run -dt -p 27017:27017/tcp --env MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} --env MONGO_INITDB_ROOT_PASSWORD=${MONGO_SECRET} --name ${MONGO} ${MONGO_IMG}

rm-proxy:
	-podman kill ${PROXY}
	-podman rm ${PROXY}
	-rm -rf /tmp/sssp-proxy/

rm-server:
	-podman kill ${SERVER}
	-podman rm ${SERVER}

rm-mongo:
	-podman kill ${MONGO}
	-podman rm ${MONGO}

rm-client:
	-podman kill ${CLIENT}
	-podman rm ${CLIENT}


############## Build images ##############l