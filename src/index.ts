import { AppDataSource } from './data-source';
// import { IUser } from './entity/user';

import userService from './service/user';



AppDataSource.initialize()
  .then(async () => {
  
    // const userBody: IUserRequest = {
    //   email: 'ggg@g.com',
    //   firstName: 'Alexfffff2',
    //   lastName: 'Saw',
    //   isObfuscated: false,
    //   globalId: '0'
    // }
    // const newUser = new User(userBody);

    // const user = await userService.create(newUser)
    // console.log(`Saved a new user : ${user}`);

    const user = await userService.obfuscate(4)
    console.log('Update a new user : ', user);
  })
  .catch((error) => console.log(error));
