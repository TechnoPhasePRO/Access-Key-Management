import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { AccessKeyResponseDto, CreateAccessKeyDto, UpdateAccessKeyDto } from 'src/dto/access-key.dto';

@Injectable()
export class AccessKeyService {
  private readonly accessKeys = new Map<string, any>();
  private readonly logger = new Logger(AccessKeyService.name);

  async createAccessKey(createAccessKeyDto: CreateAccessKeyDto) {
    const key = Math.random().toString(36).substring(7);
    this.accessKeys.set(key, createAccessKeyDto);
    this.logger.log(`Access key created: ${key}`);
    return key;
  }

  async listAccessKeys() {
    const keys = Array.from(this.accessKeys.keys());
    this.logger.log(`Access keys listed: ${keys}`);
    return keys;
  }

  async getAccessKeyDetails(key: string) {
    const accessKey = this.accessKeys.get(key);
    if (!accessKey) {
      this.logger.error(`Access key not found: ${key}`);
      throw new NotFoundException('Access key not found');
    }
    this.logger.log(`Access key details fetched for key: ${key}`);
    return accessKey;
  }

  async deleteAccessKey(key: string) {
    const deleted = this.accessKeys.delete(key);
    if (!deleted) {
      this.logger.error(`Access key not found for deletion: ${key}`);
      throw new NotFoundException('Access key not found');
    }
    this.logger.log(`Access key deleted: ${key}`);
    return deleted;
  }

  async updateAccessKey(key: string, updateAccessKeyDto: UpdateAccessKeyDto) {
    const accessKey = this.accessKeys.get(key);
    if (!accessKey) {
      this.logger.error(`Access key not found for update: ${key}`);
      throw new NotFoundException('Access key not found');
    }
    Object.assign(accessKey, updateAccessKeyDto);
    this.logger.log(`Access key updated: ${key}`);
    return accessKey;
  }

  async accessKeyDetails(key: string): Promise<AccessKeyResponseDto> {
    try {
      const accessKey = this.accessKeys.get(key);
      if (!accessKey) {
        this.logger.error(`Access key not found for details: ${key}`);
        throw new NotFoundException('Access key not found');
      }
      
      const response = new AccessKeyResponseDto();
      response.expiration = accessKey.expiration;
      response.key = key;
      response.rateLimit = accessKey.rateLimit;
      this.logger.log(`Access key details fetched via gRPC for key: ${key}`);
      return response;
    } catch (error) {
      this.logger.error(`Error fetching access key details via gRPC for key: ${key}, Error: ${error.message}`);
      return null;
    }
  }
}
