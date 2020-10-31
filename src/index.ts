import Hapi from '@hapi/hapi';
import hapiPino from 'hapi-pino';

import getConfFromEnv from './config/getConfFromEnv';
import makeLog from './logging/makeLog';
import { NewReview, Review, UpdatedReview } from "./review";
import InMemoryReviewStore from './inMemoryReviewStore';
export interface Options {
  host: string;
  port: number;
}

export default async function init({host, port}: Options): Promise<void> {
  // const log = makeLog();
  // const conf = getConfFromEnv(process.env);
  const store = new InMemoryReviewStore();
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
    handler: async (req, h) => {
      const review = await store.list();

      return { reviews: [review] };
    },
  });

  server.route({
    method: 'get',
    path: '/v1/reviews/{id}',
    handler: async (req, h) => {
      const review = await store.get(req.params.id);

      return { review };
    },
  });

  server.route({
    method: 'post',
    path: '/v1/reviews',
    handler: async (req, h) => {
      const review = await store.create(req.payload as NewReview);

      return { review };
    },
  });

  server.route({
    method: 'put',
    path: '/v1/reviews/{id}',
    handler: async (req, h) => {
      // accept partial as payload
      const review = await store.update(req.params.id, req.payload as UpdatedReview);

      return { review };
    },
  });

  server.route({
    method: 'delete',
    path: '/v1/reviews/{id}',
    handler: async (req, h) => {
      await store.delete(req.params.id);
      return {};
    },
  });

  await server.start();
};
