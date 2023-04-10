import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/entities/teacher.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  fetchAll() {
    return this.teacherRepo.find();
  }

  fetchOne(id: number) {
    return this.teacherRepo.findOne({
      where: { id },
    });
  }

  create(teacher: Partial<Teacher>) {
    const newTeacher = this.teacherRepo.create(teacher);
    return this.teacherRepo.save(newTeacher);
  }

  async update(id: number, attrs: Partial<Teacher>) {
    const teacher = await this.fetchOne(id);

    if (!teacher) {
      return null;
    }

    Object.assign(teacher, attrs);
    return this.teacherRepo.save(teacher);
  }

  async delete(id: number) {
    const teacher = await this.fetchOne(id);

    if (!teacher) {
      return null;
    }

    return this.teacherRepo.remove(teacher);
  }
}
