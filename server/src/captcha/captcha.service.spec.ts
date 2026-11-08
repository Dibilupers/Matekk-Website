import { BadRequestException, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaService } from './captcha.service.js';

describe('CaptchaService', () => {
  let service: CaptchaService;
  const fetchMock = vi.fn<typeof fetch>();
  const getConfig = vi.fn();

  beforeEach(async () => {
    fetchMock.mockReset();
    getConfig.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaptchaService,
        { provide: ConfigService, useValue: { get: getConfig } },
      ],
    }).compile();
    service = module.get<CaptchaService>(CaptchaService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('asks hCaptcha to verify the submitted token for the configured site key', async () => {
    getConfig.mockImplementation((key: string) => ({
      HCAPTCHA_SECRET_KEY: 'private-secret',
      HCAPTCHA_SITE_KEY: 'public-site-key',
    })[key]);
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      success: true,
    }), { status: 200 }));

    await expect(service.verify('captcha-token')).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.hcaptcha.com/siteverify',
      expect.objectContaining({
        method: 'POST',
        body: new URLSearchParams({
          secret: 'private-secret',
          response: 'captcha-token',
          sitekey: 'public-site-key',
        }),
      }),
    );
  });

  it('rejects tokens hCaptcha does not accept', async () => {
    getConfig.mockImplementation((key: string) => ({
      HCAPTCHA_SECRET_KEY: 'private-secret',
      HCAPTCHA_SITE_KEY: 'public-site-key',
    })[key]);
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 }));

    await expect(service.verify('invalid-token')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('fails explicitly if the production secret is not configured', async () => {
    getConfig.mockImplementation((key: string) => key === 'HCAPTCHA_SITE_KEY' ? 'public-site-key' : undefined);

    await expect(service.verify('captcha-token')).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails explicitly if the hCaptcha site key is not configured', async () => {
    getConfig.mockImplementation((key: string) => key === 'HCAPTCHA_SECRET_KEY' ? 'private-secret' : undefined);

    await expect(service.verify('captcha-token')).rejects.toBeInstanceOf(InternalServerErrorException);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports verification service failures without accepting the token', async () => {
    getConfig.mockImplementation((key: string) => ({
      HCAPTCHA_SECRET_KEY: 'private-secret',
      HCAPTCHA_SITE_KEY: 'public-site-key',
    })[key]);
    fetchMock.mockRejectedValue(new Error('hCaptcha is unavailable'));

    await expect(service.verify('captcha-token')).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
