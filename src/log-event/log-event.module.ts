import { Module } from '@nestjs/common';
import { LogEventService } from './log-event.service';
import { LogEventController } from './log-event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LogEventController],
  providers: [LogEventService],
})
export class LogEventModule {}
