import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsController } from './leads/leads.controller';

@Module({
  imports: [],
  controllers: [AppController, LeadsController],
  providers: [AppService],
})
export class AppModule {}
