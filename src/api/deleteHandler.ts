import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../index';
import { isValidUuid, sendResponse } from '../helpers';

export const deleteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  const id = req.url?.split('/').pop();

  if (!id || !isValidUuid(id)) {
    return sendResponse(res, 400, { message: 'Invalid user ID' });
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return sendResponse(res, 404, { message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.statusCode = 204;
  res.end();
};
