import { log } from './log';
import dotenv from 'dotenv';

dotenv.config();

log(process.env.PORT);
log(process.env.NODE_ENV);
