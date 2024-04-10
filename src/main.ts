import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { resolve } from 'path';

async function bootstrap() {
  const URL = process.env.GRPC_HOST;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: URL,
      package: 'access',
      protoPath: resolve(__dirname, '../proto/access.service.proto'),
    }
  })
  await app.listen(3000);
}
bootstrap();
