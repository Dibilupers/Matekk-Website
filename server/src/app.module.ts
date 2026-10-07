import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { InquiresModule } from './inquires/inquires.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';
import { GradebookModule } from './gradebook/gradebook.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();
const observeAppKey = process.env.OBSERVE_APP_KEY?.trim();
const observeAppSecret = process.env.OBSERVE_APP_SECRET?.trim();
if (Boolean(observeAppKey) !== Boolean(observeAppSecret)) {
  throw new Error('Both OBSERVE_APP_KEY and OBSERVE_APP_SECRET must be configured to enable telemetry.');
}
const observeOptions = observeAppKey && observeAppSecret
  ? {
      appKey: observeAppKey,
      appSecret: observeAppSecret,
      serviceId: process.env.OBSERVE_SERVICE_ID?.trim() || 'server',
    }
  : null;
export const isObserveEnabled = observeOptions !== null;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(observeOptions ? [ObserveModule.forRoot(observeOptions)] : []),
    AuthModule,
    UsersModule,
    InquiresModule,
    QuestionsModule,
    EnrollmentsModule,
    GradebookModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
