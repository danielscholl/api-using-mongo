# api-using-mongo

Microservice Sample using Mongo as a backing store.

### Requirements

- Docker for Mac: 1.13.1 (build: 092cba3)
- NODE: 8.10.0 or greater
- NPM: 5.8.0 or greater
- YARN: 1.5.1 or greater

Environment Options (.env)

| Environment Var         | Default      | Description                                    |
| ----------------------- | ------------ | ---------------------------------------------- |
|                         |              |                                                |


### Install

1. Install Packages
```
$ yarn install
```

2. Startup Local Cassandra DB for development purposes
```
$ npm run db
```

3. Test the API against Local Cassandra
```
$ npm run test
```

4. Start the API Locally
```
$ npm run start
```

5. Build Docker Image
```
$ npm run build
```

6. Start the API in Docker
```
$ npm run docker
```
http://localhost:8080

7. Stop the API in Docker
```
$ npm run docker:clean

