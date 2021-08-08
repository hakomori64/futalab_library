import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [PassportModule, UsersModule],
    providers: [JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
