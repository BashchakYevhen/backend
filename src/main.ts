import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Receipt')
    .setDescription('Receipts API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  writeFile('./swagger-spec.json', JSON.stringify(document, null, 2), (err) => {
    if (err) {
      console.error('Error writing Swagger spec file:', err);
    } else {
      console.log('Swagger spec file written successfully.');
    }
  });
  SwaggerModule.setup('/docs', app, document);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
