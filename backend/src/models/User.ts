import { IsEmail, Length } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(3)
  full_name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(3)
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
