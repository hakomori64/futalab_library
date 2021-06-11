import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Return } from 'src/return/entities/return.entity';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
