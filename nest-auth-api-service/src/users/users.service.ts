import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    const newnewUser = await newUser.save();
    delete newnewUser.password;
    return newnewUser;
  }
}
