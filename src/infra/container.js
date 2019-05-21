'use strict';

// Libraries
const { asClass, asValue, asFunction, createContainer } = require('awilix');

const MongoClient = require('../../lib/mongo-client');
const KafkaProducer = require('../../lib/kafka-producer');

// Microservice configuration
const config = require('../src/config');

// Infra
const Express = require('./express');

const getRoutes = require('../src/api');
const UserController = require('../src/api/controller');
const UserRepository = require('../src/api/repository');

// Middlewares 
const handlers = require('../src/middlewares/handlers');

/**
 * Registers the service container for the application
 * @returns
 */
function registerContainer() {
  const container = createContainer();
  container.register({
    handlers: asFunction(handlers).singleton().proxy(),
    getRoutes: asFunction(getRoutes).proxy().singleton().singleton(),
    express: asClass(Express).classic().singleton().disposer((express) => express.dispose()),
    mongoURI: asValue(config.MONGO_URI),
    mongoOpts: asValue({ useNewUrlParser: true, useCreateIndex: true }),
    mongoClient: asClass(MongoClient).classic().singleton().disposer((m) => m.close()),
    userController: asClass(UserController).classic().singleton(),
    userRepository: asClass(UserRepository).classic().singleton(),
    kafkaProducer: asClass(KafkaProducer).classic().singleton().disposer((p) => p.dispose()),
    kafkaProducerOpts: asValue({
      rdKafkaBrokerOpts: {
        'bootstrap.servers': config.KAFKA_SERVERS
      }
    })
  });

  return container;
}

module.exports = registerContainer;
