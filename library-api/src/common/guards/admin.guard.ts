import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Assuming Bearer token format
    console.log(token);
    if (!token) {
      throw new ForbiddenException('Access denied: No token provided');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET'); // Get the secret
      const decoded = this.jwtService.verify(token, { secret }); // Verify token with the secret

      if (decoded.role !== 'admin') {
        throw new ForbiddenException('Access denied: You are not an admin');
      }
    } catch (error) {
      throw new ForbiddenException(
        'Access denied: Invalid token ' + error.message,
      );
    }

    return true;
  }
}
