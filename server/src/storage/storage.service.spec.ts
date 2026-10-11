import { ConfigService } from '@nestjs/config';
import { StorageService } from './storage.service.js';

const { createClientMock, storageFromMock, uploadMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
  storageFromMock: vi.fn(),
  uploadMock: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: createClientMock,
}));

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    vi.clearAllMocks();
    uploadMock.mockResolvedValue({ error: null });
    storageFromMock.mockReturnValue({ upload: uploadMock });
    createClientMock.mockReturnValue({
      storage: { from: storageFromMock },
    });

    service = new StorageService(
      new ConfigService({
        SUPABASE_URL: 'https://project.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
      }),
    );
  });

  it('returns the private storage path after uploading a question image', async () => {
    const image = Buffer.from('image');

    await expect(service.uploadQuestionImage(image, 'question-13.png')).resolves.toBe(
      'questions/question-13.png',
    );

    expect(storageFromMock).toHaveBeenCalledWith('question-images');
    expect(uploadMock).toHaveBeenCalledWith('questions/question-13.png', image, {
      contentType: 'image/png',
      upsert: false,
    });
  });
});
