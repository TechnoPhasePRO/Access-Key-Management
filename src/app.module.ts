import { Module } from '@nestjs/common';
import { AccessKeyModule } from './modules/access-key.module';

@Module({
  imports: [AccessKeyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
