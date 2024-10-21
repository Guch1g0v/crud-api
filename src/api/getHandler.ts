import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../index';
import { isValidUuid, sendResponse } from '../helpers';

// eslint-disable-next-line consistent-return
export const getHandler = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url === '/api/users' || req.url === '/api/users/') {
    return sendResponse(res, 200, users);
  }
  const id = req.url?.split('/').pop();
  if (id && isValidUuid(id)) {
    const user = users.find((u) => u.id === id);
    if (user) {
      return sendResponse(res, 200, user);
    }
    return sendResponse(res, 404, { message: 'User not found' });
  }
  sendResponse(res, 400, { message: 'Invalid user ID' });
};
