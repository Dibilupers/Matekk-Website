import { Test, TestingModule } from '@nestjs/testing';
import { InquiresController } from './inquires.controller.js';

describe('InquiresController', () => {
  let controller: InquiresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquiresController],
    }).compile();

    controller = module.get<InquiresController>(InquiresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
