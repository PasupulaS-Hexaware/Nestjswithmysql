import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { Teacher } from "src/entities/teacher.entity";
import { TeacherService } from "src/services/teacher.service";

@Controller("/teacher")
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get("")
  fetchAll() {
    return this.teacherService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const teacher = await this.teacherService.fetchOne(+id);

    if (!teacher) throw new NotFoundException("Teacher not found");

    return teacher;
  }

  @Post()
  create(@Body() teacher: Teacher) {
    return this.teacherService.create(teacher);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() teacher: Teacher) {
    const receivedTeacher = await this.teacherService.update(+id, teacher);

    if (!receivedTeacher) throw new NotFoundException("Teacher not found");

    return receivedTeacher;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedTeacher = await this.teacherService.delete(+id);

    if (!receivedTeacher) throw new NotFoundException("Teacher not found");

    return receivedTeacher;
  }
}
