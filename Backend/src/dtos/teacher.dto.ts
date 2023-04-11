import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class TeacherDTO {
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(5)
  @IsString()
  tname: string;
  
  @IsNotEmpty()
  @MaxLength(3)
  @MinLength(1)
  @IsString()
  age: string;
  
}
