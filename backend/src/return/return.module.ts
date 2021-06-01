import { Module } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Return])
  ],
  controllers: [ReturnController],
  providers: [ReturnService]
})
export class ReturnModule {}
