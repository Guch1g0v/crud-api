import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../index';
import { parseBody, isValidUuid, sendResponse } from '../helpers';

export const putHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const id = req.url?.split('/').pop();

  if (!id || !isValidUuid(id)) {
    return sendResponse(res, 400, { message: 'Invalid user ID' });
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return sendResponse(res, 404, { message: 'User not found' });
  }

  try {
    const { username, age, hobbies } = await parseBody(req);

    if (
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies)
    ) {
      return sendResponse(res, 400, { message: 'Invalid request body' });
    }

    users[userIndex] = { ...users[userIndex], username, age, hobbies };
    sendResponse(res, 200, users[userIndex]);
  } catch (error) {
    let message = 'An unknown error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    sendResponse(res, 500, { message });
  }
};
