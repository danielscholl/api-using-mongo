FROM node:carbon
MAINTAINER Daniel Scholl

COPY package.json /opt/web/package.json
WORKDIR /opt/web

ENV NODE_ENV=production DB_HOST=db

RUN npm install --unsafe-perm=true --production
COPY index.js /opt/web
COPY routes /opt/web/routes
COPY lib /opt/web/lib
EXPOSE  3000

CMD ["node", "index.js"]
