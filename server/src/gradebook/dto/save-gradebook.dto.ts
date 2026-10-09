import { IsObject } from 'class-validator';

export class SaveGradebookDto {
  @IsObject()
  data: Record<string, unknown>;
}
