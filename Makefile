


############## Local run ##############


run: client server up

stop: down

up:
	#sudo iptables -I INPUT -i docker0 -j ACCEPT
	docker-compose up -d

down:
	docker-compose down

client:
	cd sssp-client
	yarn install
	cd ..

server:
	cd sssp-server
	yarn install
	cd ..

refresh: stop run