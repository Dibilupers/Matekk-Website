import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsIn,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    @Length(1, 120)
    module: string;

    @IsString()
    @Length(1, 120)
    topic: string;

    @IsIn(['Easy', 'Medium', 'Hard'])
    difficulty: 'Easy' | 'Medium' | 'Hard';

    @IsString()
    @Length(1, 5000)
    question_text: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(8)
    @IsString({ each: true })
    @MaxLength(500, { each: true })
    choices: string[];

    @IsString()
    @Length(1, 500)
    correct_answer: string;

    @IsString()
    @MaxLength(5000)
    explanation: string;
}