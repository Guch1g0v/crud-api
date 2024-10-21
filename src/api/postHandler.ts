import { IncomingMessage, ServerResponse } from 'http';
import { v4 } from 'uuid';
import { users } from '../index';
import { parseBody, sendResponse } from '../helpers';
import { User } from '../types';

export const postHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    const { username, age, hobbies } = await parseBody(req);
    if (
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies)
    ) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }
    const newUser: User = {
      id: v4(),
      username,
      age,
      hobbies,
    };
    users.push(newUser);
    sendResponse(res, 201, newUser);
  } catch (error) {
    let message = 'An unknown error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    sendResponse(res, 400, { message });
  }
};
