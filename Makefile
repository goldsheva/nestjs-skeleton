all: pull build restart

.PHONY: pull
pull:
	sudo -u www-data git pull

.PHONY: build
build:
	. nodeenv/bin/activate && cd server && npm run build

.PHONY: restart
restart:
	service nestjs-skeleton restart
