import { IsObject, IsOptional } from 'class-validator';

export class RecordGradebookAssessmentDto {
  @IsOptional()
  @IsObject()
  assessment?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}
