import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const port = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  await app.listen(port);
}
bootstrap();
