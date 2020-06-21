# Used docker image
include .env

NODE_IMG ?= registry.access.redhat.com/ubi8/nodejs-12
NGINX_IMG ?= nginx
MONGO_IMG ?= mongo
SERVER ?= sssp-server
CLIENT ?= sssp-client
MONGO ?= sssp-mongo
PROXY ?= sssp-proxy

############## Local run ##############

run: infos mongo server proxy

remove: rm-proxy rm-server rm-mongo

refresh: remove run

clean:
	-podman kill -a
	-podman rm -a
	-rm -rf /tmp/sssp-proxy/

infos:
	export IP="$(hostname -I | cut -d' ' -f1)"


proxy:
	mkdir /tmp/sssp-proxy/
	sed s/IP/${IP}/g ./sssp-dev-proxy/sssp.conf >> /tmp/sssp-proxy/sssp.conf
	podman run -dt -p 8080:8080/tcp -v /tmp/sssp-proxy/:/etc/nginx/conf.d/ --name ${PROXY} ${NGINX_IMG}

server:
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
	sleep 10

mongo:
	podman run -dt -p 27017:27017/tcp --env MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} --env MONGO_INITDB_ROOT_PASSWORD=${MONGO_SECRET} --name ${MONGO} ${MONGO_IMG}
	sleep 10

rm-proxy:
	podman kill ${PROXY}
	podman rm ${PROXY}
	rm -rf /tmp/sssp-proxy/

rm-server:
	podman kill ${SERVER}
	podman rm ${SERVER}

rm-mongo:
	podman kill ${MONGO}
	podman rm ${MONGO}


############## Build images ##############l