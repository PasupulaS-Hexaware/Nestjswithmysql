import { Test } from "@nestjs/testing";
import { TeacherService } from "src/services/teacher.service";
import { TeacherController } from "src/controllers/teacher.controller";
import { Teacher } from "src/entities/teacher.entity";

describe("TeacherController", () => {
  let controller: TeacherController;
  let service: TeacherService;

  const singleTeacher = {
    id: 1,
    tname: "rapidx",
    age: "rapidx",
  } as Teacher;

  const multipleTeachers = [
    {
      id: 1,
      tname: "rapidx",
      age: "rapidx",
    },
  ] as Teacher[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleTeachers),
      fetchOne: (id: number) => Promise.resolve(singleTeacher),
      create: (teacher: Teacher) => Promise.resolve(teacher),
      delete: (id: number) => Promise.resolve(singleTeacher),
      update: (id: number, teacher: Partial<Teacher>) => Promise.resolve(teacher),
    };

    const module = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(TeacherController);
    service = module.get(TeacherService);
  });

  describe("fetchAll", () => {
    it("should fetch all teachers", async () => {
      const teachers = await controller.fetchAll();
      expect(teachers.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one teacher for the given id", async () => {
      const teacher = await controller.fetchOne("1");
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });

  describe("Create teacher", () => {
    it("should create a teacher", async () => {
      const teacher = await controller.create(singleTeacher);
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });

  describe("Update teacher", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, teacher: Partial<Teacher>) => Promise.resolve(null);
      await expect(controller.update("1", singleTeacher)).rejects.toThrow();
    });

    it("should return one teacher for the given id", async () => {
      const teacher = await controller.update("1", singleTeacher);
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });

  describe("Delete teacher", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one teacher for the given id", async () => {
      const teacher = await controller.delete("1");
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });
});
