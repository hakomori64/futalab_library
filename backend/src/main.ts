import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error'],
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('This Doc shows how to use this api')
    .setVersion('0.1')
    .addTag('library')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD',
    allowedHeaders: 'X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept, Authorization',
  });

  await app.listen(configService.get('PORT') | 3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
