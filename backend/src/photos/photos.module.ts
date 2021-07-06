import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from '../borrow/entities/borrow.entity';
import { Return } from '../return/entities/return.entity';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
