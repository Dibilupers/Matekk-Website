import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/questions.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';


@Injectable()
export class QuestionsService {
    constructor(
        private prisma: PrismaService,
        private storage: StorageService,
    ) { }

    create(data: CreateQuestionDto) {
        if (!data.choices.includes(data.correct_answer)) {
          throw new BadRequestException('The correct answer must be one of the question choices.');
        }

        return this.prisma.questionsRls.create({
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
        return this.prisma.questionsRls.findMany();
    }

    // The full CCNA question bank used by the exams
    async findBank() {
        const rows = await this.prisma.questions.findMany({
            select: {
                id: true,
                module: true,
                topic: true,
                question_text: true,
                choices: true,
                correct_answer: true,
                explanation: true,
                imageUrl: true,
            },
            orderBy: { id: 'asc' },
        });
        const imagePaths = [...new Set(rows.flatMap((row) => {
            const imageUrl = row.imageUrl;
            return imageUrl && !/^https?:\/\//i.test(imageUrl) ? [imageUrl] : [];
        }))];
        const signedUrls = await this.storage.createSignedQuestionImageUrls(imagePaths);

        return rows.map((row) => ({
            ...row,
            imageUrl: row.imageUrl ? signedUrls.get(row.imageUrl) ?? row.imageUrl : null,
        }));
    }

}
