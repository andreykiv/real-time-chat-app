import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, Roles } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  age: number;

  @Column()
  gender: Gender;

  @Column({ default: 'visitor' })
  userRole: Roles;
}
