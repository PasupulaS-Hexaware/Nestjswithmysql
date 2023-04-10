import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  tname: string;

  @Column()
  age: string;

}
