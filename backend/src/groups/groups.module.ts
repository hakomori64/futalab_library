import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group])
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware)
            .forRoutes(GroupsController)
  }
}
