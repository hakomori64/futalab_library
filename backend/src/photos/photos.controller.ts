import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Logger, Res } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('photos')
export class PhotosController {
  private readonly logger = new Logger(PhotosController.name);

  constructor(
    private readonly photosService: PhotosService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, './images/thumbnails')
      },
      filename: (req, file, cb) => {
        console.log(file);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  uploadCoverImage(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(file);
    return {
      'cover_image_url': `${this.configService.get("SERVER_URL")}${this.configService.get("SERVER_PREFIX")}photos/${file.filename}`
    };
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/thumbnails' });
  }
}
