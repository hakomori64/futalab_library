import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Logger, Res, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('photos')
export class PhotosController {
  private readonly logger = new Logger(PhotosController.name);

  constructor(
    private readonly photosService: PhotosService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, './images/thumbnails');
      },
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadCoverImage(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(file);
    return {
      cover_image_url: `${this.configService.get('HOST')}:${process.env.NODE_ENV === 'development' ? this.configService.get('PORT') : ''}/${this.configService.get('SERVER_PREFIX')}/photos/${file.filename}`,
    };
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images/thumbnails' });
  }
}
