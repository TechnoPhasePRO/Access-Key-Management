import { Controller, Post, Body, Get, Delete, Param, Patch, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from 'src/dto/access-key.dto';
import { AccessKeyService } from 'src/services/access-key.service';

@Controller('access-keys')
export class AccessKeyController {
  private readonly logger = new Logger(AccessKeyController.name);

  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post('create')
  async createAccessKey(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    try {
      const key = await this.accessKeyService.createAccessKey(createAccessKeyDto);
      this.logger.log(`Access key created: ${key}`);
      return { key };
    } catch (error) {
      this.logger.error(`Error creating access key: ${error.message}`);
      return { error: error.message };
    }
  }

  @Get('list')
  async listAccessKeys() {
    try {
      const keys = await this.accessKeyService.listAccessKeys();
      this.logger.log('Access keys listed');
      return keys;
    } catch (error) {
      this.logger.error(`Error listing access keys: ${error.message}`);
      return { error: error.message };
    }
  }

  @Get('details/:key')
  async getAccessKeyDetails(@Param('key') key: string) {
    try {
      const details = await this.accessKeyService.getAccessKeyDetails(key);
      this.logger.log(`Access key details fetched for key: ${key}`);
      return details;
    } catch (error) {
      this.logger.error(`Error fetching access key details for key: ${key}, Error: ${error.message}`);
      return { error: error.message };
    }
  }

  @Delete('delete/:key')
  async deleteAccessKey(@Param('key') key: string) {
    try {
      const deleted = await this.accessKeyService.deleteAccessKey(key);
      this.logger.log(`Access key deleted: ${key}`);
      return { deleted };
    } catch (error) {
      this.logger.error(`Error deleting access key: ${key}, Error: ${error.message}`);
      return { error: error.message };
    }
  }

  @Patch('update/:key')
  async updateAccessKey(@Param('key') key: string, @Body() updateAccessKeyDto: UpdateAccessKeyDto) {
    try {
      const updated = await this.accessKeyService.updateAccessKey(key, updateAccessKeyDto);
      this.logger.log(`Access key updated: ${key}`);
      return updated;
    } catch (error) {
      this.logger.error(`Error updating access key: ${key}, Error: ${error.message}`);
      return { error: error.message };
    }
  }

  @GrpcMethod('AccessKeyService','AccessKeyDetails')
  async accessKeyDetails(body: {key:string}) {
    try {
      const response = await this.accessKeyService.accessKeyDetails(body.key);
      this.logger.log(`Access key details fetched via gRPC for key: ${body.key}`);
      return response;
    } catch (error) {
      this.logger.error(`Error fetching access key details via gRPC for key: ${body.key}, Error: ${error.message}`);
      return { error: error.message };
    }
  }
}
