import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/questions.dto.js';
import {PrismaService} from "../../prisma/prisma.service.js";


@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateQuestionDto) {
        return this.prisma.questions.create({
            data: {
                module: data.module,
                topic: data.topic,
                difficulty: data.difficulty,
                question_text: data.question_text,
                choices: JSON.stringify(data.choices),
                correct_answer: data.correct_answer,
                explanation: data.explanation,
            },
        });
    }

    findAll() {
        return this.prisma.questions.findMany();
    }

}
