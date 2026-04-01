import { Injectable } from '@nestjs/common';
import { CreateLogEventDto } from './dto/create-log-event.dto';
import { UpdateLogEventDto } from './dto/update-log-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogEventService {
  constructor(private prisma: PrismaService) {}

  async create(createLogDto: CreateLogEventDto) {
    return this.prisma.logEvent.create({
      data: createLogDto,
    });
  }

  async findAll() {
    return await this.prisma.logEvent.findMany({ take: 50 });
  }

  findOne(id: number) {
    return `This action returns a #${id} logEvent`;
  }

  async update(id: number, updateLogEventDto: UpdateLogEventDto) {
    return this.prisma.logEvent.update({
      where: { id },
      data: updateLogEventDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} logEvent`;
  }
}
