import { IsEmail, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("subscribers")
class Subscriber {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(11)
  cpf: string;

  @Column()
  @Length(3, 150)
  full_name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  @Length(8)
  cep: string;

  @Column()
  @Length(2)
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  @Length(10)
  address: string;

  @Column()
  number: string;

  @Column()
  address_2: string;
  
  @Column()
  @Length(3)
  hear_about_the_event: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subscriber;
