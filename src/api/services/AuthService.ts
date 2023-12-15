import { UserRepository } from '../../db/repositories/UserRepository';
import { AuthDto } from '../dtos/AuthDto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor (
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser (username: string, pass: string): Promise<any> {
    const user = await this.userRepository.find({ username });

    if (!user) {
      throw new UnauthorizedException('User with such credentials was not found');
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Incorrect password provided');
    }

    delete user.password;

    return user;
  }

  async login (user: User) {
    const payload = { sub: user.id, username: user.username, createdAt: Date.now() };
    return { token: this.jwtService.sign(payload) };
  }

  async signUp (user: AuthDto) {
    if (await this.userRepository.find({ username: user.username })) {
      throw new ConflictException('User with such credentials already exist');
    }

    const newUser = await  this.userRepository.create({
      ...user,
      password: await this.hashPass(user.password),
    });

    delete newUser.password;

    return newUser;
  }

  async hashPass (password: string) {
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}
