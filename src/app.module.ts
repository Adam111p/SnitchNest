import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogEventModule } from './log-event/log-event.module';

@Module({
  imports: [LogEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
