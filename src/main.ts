import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';

const PORT = 3000;

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap().then(() =>
  console.log(`Running on http://localhost:${PORT}`)
);
