import { OnboardingSchema } from '@repo/contracts/onboarding';
import { createZodDto } from 'nestjs-zod';

export class OnboardUserDto extends createZodDto(OnboardingSchema) {}
