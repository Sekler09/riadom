import { EditProfileSchema } from '@repo/contracts/profile';
import { createZodDto } from 'nestjs-zod';

export class EditProfileDto extends createZodDto(EditProfileSchema) {}
