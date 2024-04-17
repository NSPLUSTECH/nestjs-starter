import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from "./User.Service";
import UserDto from "src/DTOs/User.dto";
import { UserEntity } from "src/Entities/User.entity";

@Injectable()
export class AuthService {
    saltOrRounds: number = 10;

    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new UnauthorizedException();
            }

            const payload = { sub: user.id, email: user.email };

            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new NotFoundException();
        }
    }

    async signup(user: UserDto) {
        const hashPass = await bcrypt.hash(user.password, this.saltOrRounds)
        const userEntity = new UserEntity()
        userEntity.email = user.email
        userEntity.firstName = user.firstName
        userEntity.lastName = user.lastName
        userEntity.password = hashPass
        userEntity.isActive = true
        await this.usersService.createUser(userEntity)
        return user
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (e) {
            console.error(e)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (<any>request.headers).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}