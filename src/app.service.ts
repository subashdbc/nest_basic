import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { Employee } from './entities/employee.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  async seed() {
    const ceo = this.employeeRepo.create({ name: 'Subash' });
    await this.employeeRepo.save(ceo);

    const ceoContact = this.contactRepo.create({
      email: 'test@test.com',
    });
    ceo.contactInfo.employee = ceo;
    await this.contactRepo.save(ceoContact);

    const manager = this.employeeRepo.create({
      name: 'Ruban',
      manager: ceo,
    });

    const task = this.taskRepo.create({ name: 'Hire people' });
    await this.taskRepo.save(task);

    const task1 = this.taskRepo.create({ name: 'Present it to people' });
    await this.taskRepo.save(task1);

    manager.tasks = [task, task1];

    const meet = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meet.attendes = [ceo];
    await this.meetingRepo.save(meet);

    manager.meetings = [meet];

    await this.employeeRepo.save(manager);
  }
  getHello(): string {
    return 'Hello World!';
  }

  getEmployeeById(id: number) {
    return this.employeeRepo.find({
      relations: {
        manager: true,
      },
      where: {
        id: id,
      },
    });
  }
}
