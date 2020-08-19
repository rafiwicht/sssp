# Used docker image
include .env

NODE_IMG ?= node
NGINX_IMG ?= nginx
MONGO_IMG ?= mongo
KEYCLOAK_IMG ?= jboss/keycloak
LDAP_IMG ?= osixia/openldap:1.4.0
GITLAB_IMG ?= gitlab/gitlab-ce


SERVER ?= sssp-server
CLIENT ?= sssp-client
MONGO ?= sssp-mongo
PROXY ?= sssp-proxy
KEYCLOAK ?= sssp-keycloak
LDAP ?= sssp-ldap
GITLAB ?= sssp-gitlab

############## Local run ##############

pod:
	podman pod create -p 8000 -p 27017 -p 8080 -p 8001 --name sssp

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
		--env GITHUB_TOKEN=${GITHUB_TOKEN} \
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

ldap:
	podman run -dt \
		--pod sssp \
		--env LDAP_TLS=false \
		--env LDAP_DOMAIN=rwicht.ch \
		-v "./sssp-ldap/sssp.ldif:/container/service/slapd/assets/config/bootstrap/ldif/sssp.ldif:Z" \
		--name ${LDAP} \
		${LDAP_IMG} \
		--copy-service --loglevel debug
	sleep 20

rm-ldap:
	-podman kill ${LDAP}
	-podman rm ${LDAP}

refresh-ldap: rm-ldap ldap

gitlab:
	-mkdir sssp-gitlab/logs
	-mkdir sssp-gitlab/data
	podman run -dt \
		--pod sssp \
		--name ${GITLAB} \
		-v "./sssp-gitlab/config:/etc/gitlab:Z" \
  		-v "./sssp-gitlab/logs:/var/log/gitlab:Z" \
  		-v "./sssp-gitlab/data:/var/opt/gitlab:Z" \
		${GITLAB_IMG}

rm-gitlab:
	-podman kill ${GITLAB}
	-podman rm ${GITLAB}
	-rm -rf sssp-gitlab/logs
	-rm -rf sssp-gitlab/data

refresh-gitlab: rm-gitlab gitlab

run: pod gitlab ldap mongo keycloak server client proxy

stop: rm-pod

refresh: stop run
