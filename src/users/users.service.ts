import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }

  async findById(id: string): Promise<User> {
    const res = await this.userModel.findById(id);
    if (!res) {
      throw new NotFoundException('User Not Found');
    }
    return res;
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    const regex = new RegExp(searchTerm, 'i');

    return this.userModel
      .find({
        $or: [{ name: regex }, { email: regex }],
      })
      .exec();
  }
}
