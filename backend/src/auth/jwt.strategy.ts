import { ManagementClient, User } from 'auth0';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        private readonly usersService: UsersService
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        if (!payload) {
            this.logger.debug('empty payload');
            done(new UnauthorizedException(), false);
        }
        this.logger.debug('validation passed');

        const user = await this.usersService.findOneBy({ sub: payload.sub }) ?? {};

        return done(null, user);
    }
}