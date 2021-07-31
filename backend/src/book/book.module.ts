import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity'
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book])
  ],
  controllers: [BookController,],
  providers: [BookService]
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware)
            .forRoutes(BookController)
  }
}
