


############## Local run ##############

run:
	sudo iptables -I INPUT -i docker0 -j ACCEPT
	docker-compose up -d

stop:
	docker-compose down

refresh: stop run