import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error']
  });
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('This Doc shows how to use this api')
    .setVersion('0.1')
    .addTag('library')
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    
  await app.listen(8000);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
