import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isObfuscated: boolean;
  globalId: string;
  createdAt: Date;
  updatedAt: Date;
}
@Entity()
class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isObfuscated: boolean;

  @Column()
  globalId: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor({
    email = 'email',
    firstName = 'firstName',
    lastName = 'lastName',
    isObfuscated = false,
    globalId = '0',
  }: Partial<IUser> = {}) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isObfuscated = isObfuscated;
    this.globalId = globalId;
  }
}
export default User;
