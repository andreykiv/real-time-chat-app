export class CreateUserDto {
  username: string;
  userEmail: string;
  age: number;
  gender: Gender;
  userRole: Roles;
}

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Roles {
  admin = 'admin',
  user = 'user',
  visitor = 'visitor',
}
