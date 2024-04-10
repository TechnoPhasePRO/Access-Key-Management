import { Module } from '@nestjs/common';
import { AccessKeyController } from '../controller/access-key.controller';
import { AccessKeyService } from '../services/access-key.service';

@Module({
  controllers: [AccessKeyController],
  providers: [AccessKeyService]
})
export class AccessKeyModule {}
