


############## Local run ##############


run: client server up

stop: down

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

client:
	cd sssp-client
	yarn install
	cd ..

server:
	cd sssp-server
	yarn install
	cd ..

refresh: stop run