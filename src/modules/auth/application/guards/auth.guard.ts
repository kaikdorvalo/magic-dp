import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from 'src/shared/exceptions/auth/unauthorized.exception';
import { AuthService } from '../../domain/service/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException()
        }

        const decode = await this.decodeToken(token);
        request["user"] = decode;
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private async decodeToken(token: string) {
        try {

            const decode = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_TOKEN
                }
            )

            return decode;
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}