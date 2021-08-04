import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './groups/book/book.module';
import { BorrowModule } from './groups/borrow/borrow.module';
import { MulterModule } from '@nestjs/platform-express';
import { ReturnModule } from './groups/return/return.module';
import { PhotosModule } from './photos/photos.module';
import { RentalsModule } from './groups/rentals/rentals.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService : ConfigService) => ({
        type: 'mysql',
        host: configService.get("DATABASE_HOST"),
        port: Number(configService.get("DATABASE_PORT")),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    }),
    MulterModule.register({
      dest: './photos',
    }),
    BookModule,
    BorrowModule,
    ReturnModule,
    PhotosModule,
    RentalsModule,
    UsersModule,
    GroupsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
