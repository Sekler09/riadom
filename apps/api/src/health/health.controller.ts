import { Controller, Get } from '@nestjs/common';
import { createZodDto } from 'nestjs-zod';
import { HealthResponseSchema } from '@repo/contracts/health';

class HealthResponseDto extends createZodDto(HealthResponseSchema) {}

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
