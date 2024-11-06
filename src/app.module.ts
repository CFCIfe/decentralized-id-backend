import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'lib/utils/env';
import { ScheduleModule } from '@nestjs/schedule';
import { DecentralzedIdModule } from 'lib/modules/decentralized-id/decentralized-id.module';
import { DecentralizedIdController } from './controllers/decentralized-id.controller';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGODB_URI, { dbName: env.MONGODB_DATABASE }),
    DecentralzedIdModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, DecentralizedIdController],
  providers: [AppService],
})
export class AppModule {}
