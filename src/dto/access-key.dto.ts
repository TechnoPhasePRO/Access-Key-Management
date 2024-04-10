export class CreateAccessKeyDto {
    rateLimit: number;
    expiration: string;
  }
  
  export class UpdateAccessKeyDto {
    rateLimit?: number;
    expiration?: string;
  }
  export class AccessKeyResponseDto {
    key:string;
    rateLimit: number;
    expiration: string;
  }