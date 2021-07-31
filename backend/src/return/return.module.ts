import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Return])
  ],
  controllers: [ReturnController],
  providers: [ReturnService]
})
export class ReturnModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware)
            .forRoutes(ReturnController)
  }
}
