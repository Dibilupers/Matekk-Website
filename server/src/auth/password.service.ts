// src/auth/password.service.ts
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import type { HashOptions } from 'argon2';

const OPTIONS: HashOptions = {
    type: argon2.argon2id,
    memoryCost: 19456, // ~19 MiB (OWASP minimum guidance)
    timeCost: 2,
    parallelism: 1,
};

@Injectable()
export class PasswordService {
    hash(plain: string): Promise<string> {
        return argon2.hash(plain, OPTIONS);
    }

    async verify(hash: string, plain: string): Promise<boolean> {
        try {
            return await argon2.verify(hash, plain);
        } catch {
            return false; // malformed hash (e.g. an old plaintext value) = no match
        }
    }

    needsRehash(hash: string): boolean {
        return argon2.needsRehash(hash, OPTIONS);
    }
}