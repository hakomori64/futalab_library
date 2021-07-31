import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from '../borrow/entities/borrow.entity';
import { Return } from '../return/entities/return.entity';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware)
            .forRoutes(PhotosController)
  }
}
