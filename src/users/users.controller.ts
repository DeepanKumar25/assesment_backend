import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import Web3 from 'web3';


const web3 = new Web3();
@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('create')
  async createUser(@Body() user) {
    const typesArray = [
        {type: 'string', name: 'email'}, 
        {type: 'string', name: 'phoneNumber'},
        {type: 'string', name: 'name'}
    ];
    // console.log(user.logs[0]?.data);
    const data = user.logs[0]?.data;
    if(data){
    const decodedParameters = web3.eth.abi.decodeParameters(typesArray, data);
    // Used comments for debugging
    // console.log(JSON.stringify(decodedParameters, null, 2));
    // console.log("em",decodedParameters.email);
    // console.log("ph",decodedParameters.phoneNumber);
    // console.log("na",decodedParameters.name);
    
    const createUser = await this.usersService.create({
      name: decodedParameters.name,
      email: decodedParameters.email,
      number :decodedParameters.phoneNumber,
    });
    return createUser;
  }
  }

  @Get('search')
  async getSearchUser(@Query('search') search: string): Promise<User[] | null> {
    if (search) {
      const searchResults = await this.usersService.searchUsers(search);
      return searchResults.length > 0 ? searchResults : null;
    } else {
      return null;
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
