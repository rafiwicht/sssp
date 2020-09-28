# Image names
NODE_IMG ?= node
NGINX_IMG ?= nginx
MONGO_IMG ?= mongo
KEYCLOAK_IMG ?= jboss/keycloak
LDAP_IMG ?= osixia/openldap:1.4.0
GITLAB_IMG ?= gitlab/gitlab-ce

# Podman images for test
SERVER_IMG ?= docker.io/wichtr/sssp-server
CLIENT_IMG ?= docker.io/wichtr/sssp-client

# Container names
SERVER ?= sssp-server
CLIENT ?= sssp-client
MONGO ?= sssp-mongo
PROXY ?= sssp-proxy
KEYCLOAK ?= sssp-keycloak
LDAP ?= sssp-ldap
GITLAB ?= sssp-gitlab

# Default variables
MONGO_USER ?= root
KEYCLOAK_USER ?= root
PASSWORD ?= Welcome.2020
VERSION ?= 0.2.0
GITLAB_TOKEN ?= token-for-automation
DEV_TOKEN = development-token

############## Podman development/test support applications ##############

pod:
	podman pod create -p 8000 -p 27017 -p 7022:22 -p 7080:80 --name sssp

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

proxy:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sssp-proxy/test-selfsigned.key -out sssp-proxy/test-selfsigned.crt -subj '/CN=test.sssp.local'
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sssp-proxy/gitlab-selfsigned.key -out sssp-proxy/gitlab-selfsigned.crt -subj '/CN=gitlab.sssp.local'
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
	-rm -rf sssp-proxy/*-selfsigned*

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
	-mkdir ./sssp-gitlab/logs
	-mkdir ./sssp-gitlab/data
	podman run -dt \
		--pod sssp \
		--name ${GITLAB} \
		-v "./sssp-gitlab/config:/etc/gitlab:Z" \
  		-v "./sssp-gitlab/logs:/var/log/gitlab:Z" \
  		-v "./sssp-gitlab/data:/var/opt/gitlab:Z" \
		${GITLAB_IMG}
	sleep 300
	-podman exec -it sssp-gitlab gitlab-rails runner "token = User.find_by_username('root').personal_access_tokens.create(scopes: [:api, :read_repository, :write_repository, :read_user], name: 'sssp'); token.set_token('token-for-automation'); token.save!"

rm-gitlab:
	-podman kill ${GITLAB}
	-podman rm ${GITLAB}
	-sudo rm -rf ./sssp-gitlab/logs
	-sudo rm -rf ./sssp-gitlab/data

refresh-gitlab: rm-gitlab gitlab

############## Podman development ##############

dev-run: pod ldap mongo keycloak dev-server dev-client proxy gitlab

dev-stop: rm-pod

dev-refresh: dev-stop dev-run

dev-server:
	cd sssp-server ; \
	yarn
	podman run -dt \
		--pod sssp \
		--env DEV_MODE=true \
		--env MONGO_USER=${MONGO_USER} \
		--env MONGO_SECRET=${PASSWORD} \
		--env MONGO=127.0.0.1 \
		--env GITLAB_TOKEN=${GITLAB_TOKEN} \
		--env DEV_TOKEN=${DEV_TOKEN} \
		-v "./sssp-server:/sssp-server:Z" \
		-w "/sssp-server" \
		--name ${SERVER} \
		${NODE_IMG} \
		npm run-script dev

dev-rm-server:
	-podman kill ${SERVER}
	-podman rm ${SERVER}

dev-refresh-server: dev-rm-server dev-server

dev-client:
	cd sssp-client ; \
	yarn
	podman run -dt \
		--pod sssp \
		--env DEV_MODE=true \
		--env WDS_SOCKET_PORT=8000 \
		-v "./sssp-client:/sssp-client:Z" \
		-w "/sssp-client" \
		--name ${CLIENT} \
		${NODE_IMG} \
		npm start

dev-rm-client:
	-podman kill ${CLIENT}
	-podman rm ${CLIENT}

dev-refresh-client: dev-rm-client dev-client

############## Podman test ##############

test-run: pod ldap mongo keycloak test-server test-client proxy gitlab

test-stop: rm-pod

test-refresh: test-stop test-run

test-server:
	podman run -dt \
		--pod sssp \
		--env MONGO_USER=${MONGO_USER} \
		--env MONGO_SECRET=${PASSWORD} \
		--env MONGO=127.0.0.1 \
		--env GITLAB_TOKEN=${GITLAB_TOKEN} \
		--name ${SERVER} \
		${SERVER_IMG} \
		npm run-script dev

test-rm-server:
	-podman kill ${SERVER}
	-podman rm ${SERVER}

test-refresh-server: test-rm-server test-server

test-client:
	podman run -dt \
		--pod sssp \
		--name ${CLIENT} \
		${CLIENT_IMG} 

test-rm-client:
	-podman kill ${CLIENT}
	-podman rm ${CLIENT}

test-refresh-client: test-rm-client test-client

############## Podman image build ##############

build: build-server build-client

build-server:
	cd sssp-server ; \
	yarn ; \
	yarn build ; \
	podman build -t ${SERVER_IMG}:${VERSION} . ; \
	podman tag ${SERVER_IMG}:${VERSION} ${SERVER_IMG}:latest

build-client:
	cd sssp-client ; \
	-rm .envProd ; \
	yarn ; \
	yarn build ; \
	podman build -f Dockerfile -t ${CLIENT_IMG}:${VERSION} . ; \
	podman tag ${CLIENT_IMG}:${VERSION} ${CLIENT_IMG}:latest ; \
	rm .envProd


unit-test: unit-test-server unit-test-client

unit-test-server:
	cd sssp-server ; \
	yarn test

unit-test-client:
