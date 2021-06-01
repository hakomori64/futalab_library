DIR = "node_modules"

run:
	if [ ! -d $(DIR) ]; then \
		npm install; \
	fi
	npm i -g nodemon@latest @nestjs/cli@latest
	npm run start:dev
