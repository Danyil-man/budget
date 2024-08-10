import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (user && isPasswordMatch) {
      return user;
    } else {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }

  async login(user: IUser) {
    const { id, email } = user;
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
    return {
      id,
      email,
      token,
    };
  }
}
