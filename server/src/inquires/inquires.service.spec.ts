import { Test, TestingModule } from '@nestjs/testing';
import { InquiresService } from './inquires.service.js';

describe('InquiresService', () => {
  let service: InquiresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InquiresService],
    }).compile();

    service = module.get<InquiresService>(InquiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
