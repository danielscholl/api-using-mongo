FROM danielscholl/alpine-node:7.2.0
MAINTAINER Daniel Scholl

COPY package.json /opt/web/package.json
WORKDIR /opt/web

ENV NODE_ENV=production PORT=27017 DB_HOST=db

RUN apk add --no-cache curl make gcc g++ binutils-gold python linux-headers paxctl libgcc libstdc++ gnupg && \
	adduser -S appuser && \
	addgroup -S appuser && \
  npm install --unsafe-perm=true --production && \
	apk del curl make gcc g++ binutils-gold python linux-headers paxctl gnupg ${DEL_PKGS} && \
	rm -rf rm -rf ${RM_DIRS} && \
	chown -R appuser:appuser /opt/web

COPY index.js /opt/web
COPY routes /opt/web/routes
COPY lib /opt/web/lib
EXPOSE  3000

CMD ["node", "index.js"]
