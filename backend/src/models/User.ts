import { IsEmail, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

export default User;
