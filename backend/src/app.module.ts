import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { RentalModule } from './rental/rental.module';

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
        synchronize: false,
      })
    }),
    BookModule,
    RentalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
