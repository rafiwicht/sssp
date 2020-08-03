# Used docker image
include .env

NODE_IMG ?= node
NGINX_IMG ?= nginx
MONGO_IMG ?= mongo
KEYCLOAK_IMG ?= jboss/keycloak


SERVER ?= sssp-server
CLIENT ?= sssp-client
MONGO ?= sssp-mongo
PROXY ?= sssp-proxy
KEYCLOAK ?= sssp-keycloak

############## Local run ##############

pod:
	podman pod create -p 8000 -p 27017 --name sssp

rm-pod:
	-podman pod rm sssp -f

refresh-pod: rm-pod pod

keycloak:
	podman run -dt \
		--pod sssp \
		--env KEYCLOAK_USER=${KEYCLOAK_USER}\
		--env KEYCLOAK_PASSWORD=${PASSWORD} \
		--env PROXY_ADDRESS_FORWARDING=true \
		--env KEYCLOAK_IMPORT="/sssp-keycloak/realm-export.json" \
		-v "./sssp-keycloak:/sssp-keycloak:Z" \
		--name ${KEYCLOAK} \
		${KEYCLOAK_IMG} -Djboss.bind.address.private=127.0.0.1 -Djboss.bind.address=127.0.0.1
	podman exec -it ${KEYCLOAK} /opt/jboss/keycloak/bin/add-user-keycloak.sh -u test1 -p ${PASSWORD} -r sssp
	podman exec -it ${KEYCLOAK} /opt/jboss/keycloak/bin/add-user-keycloak.sh -u test2 -p ${PASSWORD} -r sssp
	podman exec -it ${KEYCLOAK} /opt/jboss/keycloak/bin/add-user-keycloak.sh -u test3 -p ${PASSWORD} -r sssp
	podman restart ${KEYCLOAK}

rm-keycloak:
	-podman kill ${KEYCLOAK}
	-podman rm ${KEYCLOAK}

refresh-keycloak: rm-keycloak keycloak

mongo:
	podman run -dt --pod sssp --env MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} --env MONGO_INITDB_ROOT_PASSWORD=${PASSWORD} --name ${MONGO} ${MONGO_IMG}

rm-mongo:
	-podman kill ${MONGO}
	-podman rm ${MONGO}

refresh-mongo: rm-mongo mongo

server:
	cd sssp-server
	yarn
	cd ..
	podman run -dt \
		--pod sssp \
		--env DEV_MODE=true \
		--env MONGO_USER=${MONGO_USER} \
		--env MONGO_SECRET=${PASSWORD} \
		--env MONGO=localhost \
		--env SSSP_ADMINS=test1 \
		-v "./sssp-server:/sssp-server:Z" \
		-w "/sssp-server" \
		--name ${SERVER} \
		${NODE_IMG} \
		npm run-script dev

rm-server:
	-podman kill ${SERVER}
	-podman rm ${SERVER}

refresh-server: rm-server server

client:
	cd sssp-client
	yarn
	cd ..
	podman run -dt \
		--pod sssp \
		--env DEV_MODE=true \
		--env WDS_SOCKET_PORT=8000 \
		-v "./sssp-client:/sssp-client:Z" \
		-w "/sssp-client" \
		--name ${CLIENT} \
		${NODE_IMG} \
		npm start

rm-client:
	-podman kill ${CLIENT}
	-podman rm ${CLIENT}

refresh-client: rm-client client

proxy:
	podman run -dt \
		--pod sssp \
		--env DEV_MODE=true \
		--env PORT=3000 \
		-v "./sssp-proxy/:/etc/nginx/conf.d:Z" \
		--name ${PROXY} \
		${NGINX_IMG}

rm-proxy:
	-podman kill ${PROXY}
	-podman rm ${PROXY}

refresh-proxy: rm-proxy proxy

run: pod mongo keycloak server client proxy

stop: rm-pod

refresh: stop run
