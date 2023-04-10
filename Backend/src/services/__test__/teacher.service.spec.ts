import { Teacher } from "src/entities/teacher.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TeacherService } from "src/services/teacher.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("TeacherService", () => {
  let service: TeacherService;
  let repo: Repository<Teacher>;

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
    const mockRepo = {
      find: () => Promise.resolve(multipleTeachers),
      findOne: (id: number) => Promise.resolve(singleTeacher),
      save: (teacher: Teacher) => Promise.resolve(teacher),
      create: (teacher: Teacher) => teacher,
      remove: (teacher: Teacher) => Promise.resolve(teacher),
    };

    const module = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(TeacherService);
    repo = module.get(getRepositoryToken(Teacher));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all teachers from database", async () => {
      const teachers = await service.fetchAll();
      expect(teachers.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one teacher from the database", async () => {
      const teacher = await service.fetchOne(1);
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
    it("should fetch no teachers from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const teacher = await service.fetchOne(1);
      expect(teacher).toBeNull();
    });
  });

  describe("Create teacher", () => {
    it("should create the teacher of the specified values", async () => {
      const teacher = await service.create(singleTeacher);
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });

  describe("Update teacher", () => {
    it("should return null when teacher is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const teacher = await service.update(1, {});
      expect(teacher).toBeNull();
    });

    it("should update the teacher of the specified id", async () => {
      const teacher = await service.update(1, singleTeacher);
      expect(teacher.tname).toEqual(singleTeacher.tname);
      expect(teacher.age).toEqual(singleTeacher.age);
    });
  });

  describe("Delete teacher", () => {
    it("should return null when teacher is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const teacher = await service.delete(1);
      expect(teacher).toBeNull();
    });

    it("should delete the teacher of the specified id", async () => {
      const teacher = await service.delete(1);
      expect(teacher.id).toEqual(1);
    });
  });
});
