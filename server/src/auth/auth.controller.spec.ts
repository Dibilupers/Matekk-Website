import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { LoginRateLimitService } from './login-rate-limit.service.js';
import { ACCESS_TOKEN_COOKIE } from './auth-cookie.js';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  const signIn = vi.fn();
  const consume = vi.fn();
  const getConfig = vi.fn();

  beforeEach(async () => {
    signIn.mockReset();
    consume.mockReset();
    getConfig.mockReset();
    signIn.mockResolvedValue({ access_token: 'signed-token' });
    consume.mockResolvedValue(true);
    getConfig.mockReturnValue('2468');
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: { signIn } },
        { provide: LoginRateLimitService, useValue: { consume } },
        { provide: ConfigService, useValue: { get: getConfig } },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('sets the HttpOnly session cookie after a rate-limited login succeeds', async () => {
    const cookie = vi.fn();
    const response = { cookie };

    await expect(controller.signIn(
      { username: 'student', password: 'password' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' } } as never,
      response as never,
    )).resolves.toEqual({ message: 'Signed in.' });

    expect(consume).toHaveBeenCalledWith('192.0.2.1', 'student');
    expect(signIn).toHaveBeenCalledWith('student', 'password');
    expect(cookie).toHaveBeenCalledWith(
      ACCESS_TOKEN_COOKIE,
      'signed-token',
      expect.objectContaining({ httpOnly: true, sameSite: 'strict' }),
    );
  });

  it('does not authenticate when the rate limit is exceeded', async () => {
    consume.mockResolvedValue(false);

    await expect(controller.signIn(
      { username: 'student', password: 'password' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' } } as never,
      { cookie: vi.fn() } as never,
    )).rejects.toThrow('Too many login attempts.');

    expect(signIn).not.toHaveBeenCalled();
  });

  it('validates an online offline-module PIN without returning the configured value', async () => {
    const result = await controller.verifyOfflineModulePin(
      { pin: '2468' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' }, user: { role: 'Admin' } } as never,
    );

    expect(result).toEqual({ message: 'Offline PIN verified.' });
    expect(consume).toHaveBeenCalledWith('192.0.2.1', 'offline-module-pin');
    expect(JSON.stringify(result)).not.toContain('2468');
  });

  it('rejects an incorrect PIN and disables setup when no PIN is configured', async () => {
    await expect(controller.verifyOfflineModulePin(
      { pin: '1357' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' }, user: { role: 'admin' } } as never,
    )).rejects.toThrow('The shared offline PIN is incorrect.');

    getConfig.mockReturnValue(undefined);
    await expect(controller.verifyOfflineModulePin(
      { pin: '2468' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' }, user: { role: 'admin' } } as never,
    )).rejects.toThrow('Offline module PIN is not configured.');
  });

  it('does not allow a non-admin to provision the offline module PIN', async () => {
    await expect(controller.verifyOfflineModulePin(
      { pin: '2468' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' }, user: { role: 'Student' } } as never,
    )).rejects.toThrow('Only administrators can set up offline module access.');

    expect(consume).not.toHaveBeenCalled();
  });

  it('rate limits repeated shared PIN verification attempts', async () => {
    consume.mockResolvedValue(false);

    await expect(controller.verifyOfflineModulePin(
      { pin: '2468' },
      { ip: '192.0.2.1', socket: { remoteAddress: '192.0.2.1' }, user: { role: 'admin' } } as never,
    )).rejects.toThrow('Too many offline PIN attempts.');
  });
});
