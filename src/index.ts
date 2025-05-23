import Elysia from "elysia";
import { env } from "./lib/env";
import { api } from "./api";
import { animeProviders } from "./lib/constants";
import { cors } from '@elysiajs/cors';
import { createError } from "./lib/utils";

export const server = new Elysia()
  .use(cors())
  .onError(({ code }) => {
    if(code == 'NOT_FOUND') {
      return createError(code)
    }else if (code == 'VALIDATION') {
      return createError(code)
    }
  })
  .use(api)
  .get('/', () => {
    return {
      about: "This API provide the needed data like M3U8 links and japanese subtitle files for better-melon",
      status: '200',
      providers: animeProviders[0],
      routes: [
        '/api/:anilistId/:episodeNumber/:provider',
        '/api/health'
      ]
    }
  })
  .listen(env.PORT)