import Hapi from '@hapi/hapi';
import hapiPino from 'hapi-pino';

import getConfFromEnv from './config/getConfFromEnv';
import makeLog from './logging/makeLog';
import { Review } from './review';

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
      const review: Review = {
        id: 1,
        bookTitle: 'Hello World',
        isbn: '978-3-16-148410-0',
        contents: 'This is awesome',
      };

      return { reviews: [review] };
    },
  });

  server.route({
    method: 'get',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      const review: Review = {
        id: 1,
        bookTitle: 'Hello World',
        isbn: '978-3-16-148410-0',
        contents: 'This is awesome',
      };

      return { review };
    },
  });

  server.route({
    method: 'post',
    path: '/v1/reviews',
    handler: async (req, res) => {
      const review: Review = {
        id: 1,
        bookTitle: 'Hello World',
        isbn: '978-3-16-148410-0',
        contents: 'This is awesome',
      };

      return { review };
    },
  });

  server.route({
    method: 'put',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      // accept partial
      const review: Review = {
        id: 1,
        bookTitle: 'Hello World',
        isbn: '978-3-16-148410-0',
        contents: 'This is awesome',
      };

      return { review };
    },
  });

  server.route({
    method: 'delete',
    path: '/v1/reviews/{id}',
    handler: async (req, res) => {
      return {};
    },
  });

  await server.start();
};
