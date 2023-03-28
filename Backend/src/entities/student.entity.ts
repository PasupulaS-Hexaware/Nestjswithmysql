import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  sname: string;

  @Column()
  age: number;

}
