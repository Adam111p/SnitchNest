import { Injectable } from '@nestjs/common';
import { CreateLogEventDto } from './dto/create-log-event.dto';
import { UpdateLogEventDto } from './dto/update-log-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogQueryDto } from './dto/logQueryDto';
import { Prisma } from 'generated/prisma/client';

export interface LevelGroup {
  level: string;
  count: bigint;
}
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

  async findAllByQuery(query: LogQueryDto) {
    const { dateFrom, dateTo, level, page, pageSize, serviceName } = query;
    const skip = (page - 1) * pageSize;

    const where: Prisma.LogEventWhereInput = {
      level: level,
      createdAt: {
        ...(dateFrom && { gte: new Date(dateFrom) }),
        ...(dateTo && { lte: new Date(dateTo) }),
      },
      serviceName: (serviceName || undefined) && { startsWith: serviceName },
    };

    const [items, total] = await Promise.all([
      this.prisma.logEvent.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.logEvent.count({ where }),
    ]);

    return { items, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} logEvent`;
  }
  groupByLevel(): Promise<LevelGroup[]> {
    return this.prisma.$queryRaw<
      LevelGroup[]
    >`select level,count(*) as count from "LogEvent" le 
group by le."level" 
order by "count" Asc`;
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
