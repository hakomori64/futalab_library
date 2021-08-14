import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { getConnectionManager } from 'typeorm';

declare const module: any;

async function bootstrap() {
  try {
    const manager = getConnectionManager();
    console.log('checking default connection exists');
    if (manager.has('default')) {
      console.log('found it!');
      await manager.get('default').close();
    }
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

    await app.listen(process.env.NODE_ENV === 'development' ? configService.get('PORT') : Number(process.env.PORT) | 3001);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (err) {
    console.log(`caught error ${err}`);
  }
}
bootstrap();
