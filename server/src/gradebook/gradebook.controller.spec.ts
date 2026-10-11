import { GradebookController } from './gradebook.controller.js';

describe('GradebookController', () => {
  it('records a CCNA assessment through the user gradebook service', async () => {
    const recordAssessment = vi.fn(async () => ({ data: { assessments: {} } }));
    const controller = new GradebookController({
      recordAssessment,
    } as never);

    await controller.recordAssessment(
      { userId: 12 },
      'ccna',
      {
        assessment: {
          id: 'exam-attempt-1',
          type: 'exam',
          score: 42,
          maxScore: 50,
          submittedAt: 123456,
        },
      },
    );

    expect(recordAssessment).toHaveBeenCalledWith(12, 'ccna', {
      id: 'exam-attempt-1',
      type: 'exam',
      score: 42,
      maxScore: 50,
      submittedAt: 123456,
    });
  });
});
