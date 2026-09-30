export class CreateQuestionDto {
    module: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    question_text: string;
    choices: string[];
    correct_answer: string;
    explanation: string;
}