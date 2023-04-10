import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherController } from "src/controllers/teacher.controller";
import { Teacher } from "src/entities/teacher.entity";
import { TeacherService } from "src/services/teacher.service";

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
