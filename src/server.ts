import Fastify from 'fastify';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import jwtPlugin from '@fastify/jwt';

dotenv.config();


const app = Fastify({ logger: true });

app.register(jwtPlugin, { secret: process.env.JWT_SECRET! });

app.register(authRoutes, { prefix: '/api/auth' });

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 5000 });
    console.log('Server running');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
