import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async signup(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '1d' }),
      };
    }
    return null;
  }
}
