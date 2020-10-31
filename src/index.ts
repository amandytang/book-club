import Hapi from '@hapi/hapi';
import hapiPino from 'hapi-pino';

import getConfFromEnv from './config/getConfFromEnv';
import makeLog from './logging/makeLog';

export interface Options {
  host: string;
  port: number;
}

export default async function init({host, port}: Options): Promise<void> {
  // const log = makeLog();
  // const conf = getConfFromEnv(process.env);

  const server = Hapi.server({
    host,
    port,
  });

  await server.register({
    plugin: hapiPino,
    options: {
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization']
    }
  });


  server.route({
    method: 'get',
    path: '/v1/reviews',
    handler: async (req, res) => {
      return {
        message: 'All Reviews',
      };
    },
  });
  server.route({
    method: 'get',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      return {
        message: 'Single Book Review',
      };
    },
  });
  server.route({
    method: 'post',
    path: '/v1/reviews',
    handler: async (req, res) => {
      return {
        message: 'Return full Book Review',
      };
    },
  });
  server.route({
    method: 'put',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      return {
        message: 'Accept partial and return full Book Review (result of updating)',
      };
    },
  });
  server.route({
    method: 'delete',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      return {
        message: 'Accept id',
      };
    },
  });

  await server.start();
};
