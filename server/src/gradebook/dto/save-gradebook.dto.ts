import { IsObject } from 'class-validator';

export class SaveGradebookDto {
  @IsObject()
  data: Record<string, unknown>;
}

export class RecordGradebookAssessmentDto {
  @IsObject()
  assessment: Record<string, unknown>;
}
