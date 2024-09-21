import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
    private authService: AuthService,
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
        access_token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: '8h' }),
      };
    }
    return null;
  }

  async sendPasswordReset(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('No user found');

    const token = Math.random().toString(36).substr(2);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiry
    await user.save();
    await this.authService.sendResetPasswordEmail(email, token);

    console.log(`Reset password link: ${token}`);
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.findByResetPasswordToken(token);
    if (!user || user.resetPasswordExpires < new Date()) {
      throw new Error('Password reset token is invalid or has expired.');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }

  async findByResetPasswordToken(token: string): Promise<User | undefined> {
    return this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    }).exec();
  }
  
}
