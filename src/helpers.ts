import { validate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from './types';

export const isValidUuid = (id: string | undefined): boolean => {
  return id ? validate(id) : false;
};

export const parseBody = async (
  req: IncomingMessage,
): Promise<Partial<User>> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON format'));
      }
    });
  });
};

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  message: object,
): void => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(message));
};
