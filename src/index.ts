import { log } from './log';
import dotenv from 'dotenv';
import http from 'node:http';
import { getHandler } from './api/getHandler';
import { postHandler } from './api/postHandler';
import { putHandler } from './api/putHandler';
import { deleteHandler } from './api/deleteHandler';
import { sendResponse } from './helpers';
import { User } from './types';

dotenv.config();
log(process.env.NODE_ENV);

export const users: User[] = [];

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 4000;
const HOST = 'localhost';

// eslint-disable-next-line consistent-return
const server = http.createServer(async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        return getHandler(req, res);
      case 'POST':
        return postHandler(req, res);
      case 'PUT':
        return putHandler(req, res);
      case 'DELETE':
        return deleteHandler(req, res);
      default:
        sendResponse(res, 404, { message: 'Endpoint not found' });
    }
  } catch (error) {
    log(`Server Error:', ${error}`);
    sendResponse(res, 500, { message: 'Internal Server Error' });
  }
});

server.listen(PORT, HOST, () => {
  log(`Server is running at http://${HOST}:${PORT}`);
});
