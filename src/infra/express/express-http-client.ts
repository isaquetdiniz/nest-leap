import http from 'http';
import app from './config/app';

const expressHttpServer = http.createServer(app);

export default expressHttpServer;
