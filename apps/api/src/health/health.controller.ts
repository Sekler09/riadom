import { Controller, Get } from '@nestjs/common';
import { createZodDto } from 'nestjs-zod';
import { HealthResponseSchema } from '@repo/contracts/health';

import { HealthService } from './health.service';

class HealthResponseDto extends createZodDto(HealthResponseSchema) {}

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth();
  }
}
